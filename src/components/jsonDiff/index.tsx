import { find } from "lodash";
import { checkTypeData, filterNull, isBasicData } from "./utils";

export interface SourceJsonItem {
    title?: string,
    dataIndex: string,
    childrenSourceJson?: SourceJsonItem[],
    // 忽略此字段检测
    ignoreField?: boolean,
    // 手动进行diff运算，不会再自动向下进行diff
    handelDiff?: (preNode:any, curNode:any) => boolean;
    // 合并子集的diff数据
    margeDiff?:boolean;
    // 自定义字段处理
    [x: string]: any;
}

export interface DiffDataItem {
    path: (string | undefined)[];
    title: (string | undefined)[];
    oldValue: any;
    newValue: any;
    sourceJsonItem: SourceJsonItem | undefined;
    key: string | undefined;
    margeDiffData?: DiffDataItem[];
}

type JsonDiffType = (preJson: any, curJson: any, sourceJson?:SourceJsonItem[]) => DiffDataItem[]
type MakeDiffReturnType = (isDifferent:boolean, ownPreNode?: any, ownCurNode?:any, ownSourceJsonItem?: SourceJsonItem ) => DiffDataItem[]


const jsonDiff:JsonDiffType = function (preJson, curJson, sourceJson) {

    const diff = (preNode: any, curNode:any, sourceJsonItem?: SourceJsonItem) => {

        const makeDiffReturn: MakeDiffReturnType = (isDifferent, ownPreNode, ownCurNode, ownSourceJsonItem) => {
            if(!isDifferent) return []
            return [
                {
                    oldValue: ownPreNode || preNode,
                    newValue: ownCurNode || curNode,
                    sourceJsonItem: ownSourceJsonItem || sourceJsonItem,
                    key: '',
                    path: [],
                    title: [],
                }
            ] 
        }

        // 忽略此字段检测
        if(sourceJsonItem?.ignoreField) {
            return makeDiffReturn(false);
        }

        // 手动diff处理
        if(sourceJsonItem?.handelDiff) {
            const isDifferent = sourceJsonItem.handelDiff(preNode, curNode);
            return makeDiffReturn(isDifferent)
        }


        // 基础数据diff
        if(isBasicData(preNode) || isBasicData(curNode)) {
            
            const tempPreNode = checkTypeData(filterNull(preNode));
            const tempCurNode = checkTypeData(filterNull(curNode));

            return makeDiffReturn(tempPreNode !== tempCurNode);
            // if(preNode === curNode) return makeDiffReturn(false);
            // return makeDiffReturn(preNode !== curNode)
        }

        const preNodeKeys = Object.keys(preNode);
        const curNodeKeys = Object.keys(curNode);
        const margeKeys = [...new Set([...preNodeKeys,...curNodeKeys ])]

        let diffResult:DiffDataItem[] = []

        margeKeys.forEach((key, index)=>{
            let curKeySourceJsonItem = find(sourceJsonItem?.childrenSourceJson || [], {dataIndex: key})

            const makeOthInfo = (diffItem:DiffDataItem, isMargeDiffItem?:boolean) => {
                const path = [curKeySourceJsonItem?.dataIndex || key,...diffItem.path],
                    title = [curKeySourceJsonItem ? curKeySourceJsonItem?.title : key, ...diffItem.title];
                if(isMargeDiffItem) {
                    path.shift()
                    title.shift()
                }

                return {
                    ...diffItem,
                    key: diffItem.key || key,
                    path,
                    title,
                }
            }

            // 找不到curKeySourceJsonItem说明是数组或者该字段未在SourceJson中定义
            let curSourceJsonItem = curKeySourceJsonItem;
            if(!curKeySourceJsonItem && sourceJsonItem &&(Array.isArray(preNode) || Array.isArray(curNode))) {
                // 是数组的话 把curKeySourceJsonItem 赋值为父项的SourceJson
                curSourceJsonItem = sourceJsonItem;
            }
            const diffData = diff(preNode?.[key], curNode?.[key], curSourceJsonItem)
                    ?.map((diffItem) => makeOthInfo(diffItem, curKeySourceJsonItem?.margeDiff));
            
            if(curKeySourceJsonItem?.margeDiff && !!diffData.length) {
                let [margeDiffData] = makeDiffReturn(true, preNode?.[key], curNode?.[key], curKeySourceJsonItem);
                margeDiffData.margeDiffData = diffData;
                margeDiffData = makeOthInfo(margeDiffData)
                diffResult = diffResult.concat(margeDiffData || []);
            } else {
                diffResult = diffResult.concat(diffData || []);
            }
        })

        
        return diffResult
    }

    const res = diff(preJson, curJson, {dataIndex: '$', childrenSourceJson: sourceJson});

    return res
}


export default jsonDiff;