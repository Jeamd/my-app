import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cascader from "./components/Cascader";
// import jsonDiff, { DiffDataItem, SourceJsonItem } from './components/jsonDiff'
import jsonDiff, { DiffDataItem, SourceJsonItem } from "submit-diff";
import { curData, preData, sourceJsonMap } from "./components/jsonDiff/config";
import {
  filterNull,
  isBasicData,
  renderLabel,
} from "./components/jsonDiff/utils";
import { find } from "lodash";
import Highlight from "./components/testHighLight";

type DeepRenderType = (
  val: any,
  sourceJsonItem?: SourceJsonItem
) => React.ReactNode;

const options = [
  {
    label: "Light",
    value: "light",
    children: new Array(20)
      .fill(null)
      .map((_, index) => ({ label: `Number ${index}`, value: index })),
  },
  {
    label: "Bamboo",
    value: "bamboo",
    children: [
      // {
      //   label: "全选",
      //   value: "",
      // },
      {
        label: "Little",
        value: "little",
        children: [
          {
            label: "Toy Fish",
            value: "fish",
            disableCheckbox: true,
          },
          {
            label: "Toy Cards",
            value: "cards",
          },
          {
            label: "Toy Bird",
            value: "bird",
          },
        ],
      },
      {
        label: "Little2",
        value: "little2",
        children: [
          {
            label: "Toy Fish2",
            value: "fish2",
            disableCheckbox: true,
          },
          {
            label: "Toy Cards2",
            value: "cards2",
          },
          {
            label: "Toy Bird2",
            value: "bird2",
          },
        ],
      },
    ],
  },
];

function App() {
  const [value, setValue] = useState([["bamboo", "little", "all"]]);
  const [diffData, setDiffData] = useState<DiffDataItem[]>([]);

  useEffect(() => {
    const diffData = jsonDiff(preData, curData, sourceJsonMap);

    setDiffData(diffData);
  }, []);

  const deepRender: DeepRenderType = (value, sourceJsonItem) => {
    const val = filterNull(value);

    if (sourceJsonItem?.ignoreField) {
      return null;
    }

    if (sourceJsonItem?.render) {
      return sourceJsonItem?.render?.(val, sourceJsonItem) as React.ReactNode;
    }

    if (isBasicData(val)) {
      if ([null, undefined, NaN].includes(val)) return null;

      return <span>：{val?.toString?.() || val}</span>;
    }

    if (Array.isArray(val)) {
      return (
        <div style={{ marginLeft: 12, marginBottom: 20 }}>
          {val.map((i, index) => {
            const renderResult = deepRender(i, sourceJsonItem);
            if (!renderResult) return null;
            return (
              <>
                <span>{`第${index + 1}项`}</span>
                <div
                  className="deepRenderArrayBox"
                  style={{ marginLeft: 12, marginBottom: 20 }}
                >
                  {renderResult}
                </div>
              </>
            );
          })}
        </div>
      );
    }

    if (Object.prototype.toString.call(val) === "[object Object]") {
      return (
        <div
          className="deepRenderObjBox"
          style={{ marginLeft: 12, marginBottom: 20 }}
        >
          {Object.keys(val).map((key, index) => {
            const i = val[key];
            const curKeySourceJsonItem = find(
              sourceJsonItem?.childrenSourceJson || [],
              { dataIndex: key }
            );
            const renderResult = deepRender(i, curKeySourceJsonItem);
            if (!renderResult) return null;
            return (
              <div>
                <span>
                  {curKeySourceJsonItem?.title ||
                    curKeySourceJsonItem?.dataIndex ||
                    key}
                </span>
                {renderResult}
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  const renderDiffItem = (diffItem: DiffDataItem) => {
    const func = (nodeItem: DiffDataItem) => {
      if (!nodeItem.margeDiffData?.length) {
        return [
          deepRender(nodeItem.oldValue, diffItem.sourceJsonItem),
          deepRender(nodeItem.newValue, diffItem.sourceJsonItem),
        ];
      }

      const { oldDom, newDom } = nodeItem.margeDiffData.reduce(
        (preDomObj, curNodeItem) => {
          const [oldDom, newDom] = renderDiffItem(curNodeItem);

          preDomObj.oldDom.push(oldDom);
          preDomObj.newDom.push(newDom);

          return preDomObj;
        },
        { oldDom: [], newDom: [] } as { [x: string]: React.ReactNode[] }
      );

      return [oldDom, newDom];
    };

    const [oldDom, newDom] = func(diffItem);

    return [
      oldDom ? (
        <div
          className="renderDiffItemBox"
          style={{ marginLeft: 12, marginBottom: 20 }}
        >
          <span>{renderLabel(diffItem.title)}</span>
          <span>{oldDom}</span>
        </div>
      ) : null,
      newDom ? (
        <div
          className="renderDiffItemBox"
          style={{ marginLeft: 12, marginBottom: 20 }}
        >
          <span>{renderLabel(diffItem.title)}</span>
          <span>{newDom}</span>
        </div>
      ) : null,
    ];
  };

  return (
    <>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div style={{ width: "80%" }}>
            <div
              style={{ display: "flex", textAlign: "start", color: "orange" }}
            >
              <div style={{ flex: 1 }}>oldValue</div>
              <div style={{ flex: 1 }}>newValue</div>
            </div>
            {diffData.map((diffItem, index) => {
              const data = renderDiffItem(diffItem);
              const oldR = data?.[0] || null;
              const newR = data?.[1] || null;
              return (
                <div
                  key={index}
                  style={{ display: "flex", textAlign: "start" }}
                >
                  <div style={{ width: "50%" }}>{oldR}</div>
                  <div style={{ width: "50%" }}>{newR}</div>
                </div>
              );
            })}
          </div>
          <Cascader
            onChange={(val) => {
              // console.log(JSON.stringify(val));
              setValue(val as any);
            }}
            // value={value}
            options={options}
          />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
      <Highlight></Highlight>
    </>
  );
}

export default App;
