import React, { useCallback, useEffect, useMemo, useState } from "react";

interface BaseOptionType {
  [key: string]: any;
  aa?: React.ReactNode;
}

type CascaderOption = BaseOptionType & {
  label: string;
  value: string | number;
  disabled?: boolean;
  // 标记是否为叶子节点
  // 设为 `false` 时会强制标记为父节点，即使当前节点没有 children，也会显示展开图标
  //   isLeaf?: boolean;
  children?: CascaderOption[];
  // 当前节点存在子节点时，是否需要select All。默认为true
  selectAll?: boolean;
};

type CascaderSelectedValue = CascaderOption["value"][];

interface CascaderProps {
  value?: CascaderSelectedValue | CascaderSelectedValue[];
  onChange?: (
    value: CascaderProps["value"],
    selectedOptions: CascaderOption[]
  ) => void;
  options: CascaderOption[];
  multiple?: boolean;
}

const Cascader: React.FC<CascaderProps> = ({
  value,
  onChange,
  options,
  //   multiple,
  multiple = true,
}) => {
  const [ownOptions, setOwnOptions] = useState<CascaderOption[]>([...options]);

  useEffect(() => {
    setOwnOptions([...options]);
  }, [options]);

  const forEachOptions = useCallback(
    (
      callback: (
        item: CascaderOption,
        path: CascaderOption["value"][],
        index: number,
        parent?: CascaderOption
      ) => void,
      _options: CascaderOption[],
      path?: CascaderOption["value"][],
      parent?: CascaderOption
    ) => {
      _options.forEach((item, index) => {
        const _path = [...(path || []), item.value];
        callback(item, _path, index, parent);
        item.children && forEachOptions(callback, item.children, _path, item);
      });
    },
    []
  );

  const backtrackParent = useCallback(
    (callback: (item: CascaderOption) => void, optionItem: CascaderOption) => {
      callback(optionItem);
      optionItem.parent && backtrackParent(callback, optionItem.parent);
    },
    []
  );

  const optionsFunc = useMemo(() => {
    const releaseActivedState = () => {
      forEachOptions((_item, path, index, parent) => {
        _item.actived = false;
      }, ownOptions || []);
    };

    const releaseSelectedState = () => {
      forEachOptions((_item, path, index, parent) => {
        _item.selected = false;
      }, ownOptions || []);
    };

    const initOptionData = () => {
      forEachOptions((_item, path, index, parent) => {
        _item.parent = parent;
        if (
          _item.children &&
          !!_item.children.length &&
          _item?.selectAll?.toString() !== "false" &&
          !_item.hasSelectAll
        ) {
          _item.hasSelectAll = true;
          _item.children.unshift({
            label: "全选",
            value: "all",
            disabled: true,
          });
        }
      }, ownOptions || []);
    };

    const setActivedBacktrack = (optionItem: CascaderOption) => {
      backtrackParent((item) => {
        item.actived = true;
      }, optionItem);
    };

    const setSelectedBacktrack = (
      optionItem: CascaderOption,
      state: boolean
    ) => {
      backtrackParent((item) => {
        // 负责跟新父级的选中状态（小圆点）
        if (
          !state &&
          multiple &&
          item.children &&
          item.children.some((_item) => _item.selected)
        ) {
          item.selected = true;
        } else {
          item.selected = state;
        }

        // 负责更新子级的全选状态
        if (
          state &&
          item.hasSelectAll &&
          !!item?.children?.filter(
            (_item) => _item.selected && _item.value !== "all"
          ).length
        ) {
          item.children[0].selected = false;
        }
      }, optionItem);
    };

    const setActivedState = (curActiveItem: CascaderOption) => {
      releaseActivedState();
      setActivedBacktrack(curActiveItem);
      //   setActivePath(curActiveItem.path);
    };

    const changeSelectedState = (clickItem: CascaderOption) => {
      if (!multiple) {
        forEachOptions((_item) => {
          if (_item !== clickItem) {
            _item.selected = false;
          }
        }, ownOptions || []);
      }

      if (clickItem.value === "all") {
        forEachOptions((_item) => {
          if (_item !== clickItem) {
            _item.selected = false;
          }
        }, clickItem?.parent?.children || []);
      }
      setSelectedBacktrack(clickItem, !clickItem.selected);
    };

    const getSelectedPath = () => {
      const _selectedValue: CascaderSelectedValue[] = [];
      forEachOptions((item, path) => {
        if (item.selected && !item.children) {
          _selectedValue.push(path);
        }
      }, ownOptions || []);
      return _selectedValue;
    };

    const getActivedPath = () => {
      const _activedValue: (string | number)[] = [];
      forEachOptions((item) => {
        if (item.actived) {
          _activedValue.push(item.value);
        }
      }, ownOptions || []);
      return _activedValue;
    };

    initOptionData();

    return {
      releaseActivedState,
      releaseSelectedState,
      initOptionData,
      setActivedState,
      changeSelectedState,
      getSelectedPath,
      getActivedPath,
      setActivedBacktrack,
      setSelectedBacktrack,
    };
  }, [backtrackParent, forEachOptions, multiple, ownOptions]);

  const valueToOptions = useCallback(() => {
    if (!value || !value.length) {
      setOwnOptions([...(ownOptions || [])]);
      return;
    }

    const tempValue = (multiple ? value : [value]) as CascaderSelectedValue[];
    forEachOptions((item, path) => {
      if (tempValue.some((_value) => _value.join(",") === path.join(","))) {
        item.selected = false;
        optionsFunc.changeSelectedState(item);
      }
    }, ownOptions || []);
    setOwnOptions([...(ownOptions || [])]);
  }, [value, multiple, forEachOptions, ownOptions, optionsFunc]);

  const onSelectedChange = useCallback(
    (item: CascaderOption) => {
      optionsFunc.changeSelectedState(item);
      const _value = optionsFunc.getSelectedPath();
      if (value) {
        optionsFunc.releaseSelectedState();
        onChange?.(_value, ownOptions || []);
      }
      setOwnOptions([...(ownOptions || [])]);
    },
    [onChange, optionsFunc, ownOptions, value]
  );

  useEffect(() => {
    if (!value) return;
    optionsFunc.releaseSelectedState();
    valueToOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const optionsList = useMemo(() => {
    const data: CascaderOption[][] = [ownOptions || []];

    forEachOptions((item) => {
      if (item.actived) {
        data.push(item.children || []);
      }
    }, ownOptions || []);

    return data;
  }, [forEachOptions, ownOptions]);

  const renderOptionList = () => {
    return (
      <>
        {optionsList?.map((options, index) => {
          return (
            <div key={index}>
              {options.map((item) => {
                const hasChildren = item.children && !!item.children.length;
                return (
                  <div
                    onClick={() => {
                      if (hasChildren) {
                        optionsFunc.setActivedState(item);
                        setOwnOptions([...(ownOptions || [])]);
                        return;
                      }
                      //   optionsFunc.changeSelectedState(item);
                      onSelectedChange(item);
                    }}
                    key={item.value}
                    style={{
                      color: item.actived ? "red" : "#fff",
                    }}
                  >
                    {hasChildren && item.selected && <span>·</span>}
                    {item.label}
                    {hasChildren && <span>》</span>}
                    {!hasChildren && (
                      <>
                        {item.selected && <span>√</span>}
                        {!item.selected && <span>⚪</span>}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div style={{ display: "flex" }}>{renderOptionList()}</div>

      <br />
      <button
        onClick={() => {
          console.log(optionsFunc.getSelectedPath());
        }}
      >
        获取选中值
      </button>
      <br />
      <button
        onClick={() => {
          console.log(optionsFunc.getActivedPath());
        }}
      >
        获取活跃值
      </button>
    </>
  );
};

export default Cascader;
