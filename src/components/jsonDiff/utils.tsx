import { DiffDataItem, SourceJsonItem } from ".";
import { find } from "lodash";

export const checkTypeData = (val: any) => {
    if(Array.isArray(val) && !val.length) return false;

    if([undefined, null, '', NaN, 0, 1].includes(val)) return !!val;

    if(Object.prototype.toString.call(val) === '[object Object]' && !Object.keys(val).length) return false;


    return val;
    
};

export const isBasicData = function (data: any) {
    if(typeof data === 'object' && data !== null) {
        return false;
    }

    return true;
}

export const renderLabel = (title: DiffDataItem['title']) => {
    return title.filter(i => !!i).map(i => {
        if(!isNaN(Number(i))) {
            return `第${Number(i) + 1}项`;
        }
        return i;
    }).join('/')
}


export const deepRender = (val: any, sourceJsonItem?: SourceJsonItem, title?: string[]) => {
    const res: any[] = []

    const func = (val: any, sourceJsonItem?: SourceJsonItem, title?: string[]) => {

        if(typeof val !== 'object' || val === null) {
            const label = renderLabel(title || [])
            res.push(<div key={label + val}>{label}: {val}</div>)
            return;
        };
   
        for (const key in val) {
            if (Object.prototype.hasOwnProperty.call(val, key)) {
                let curKeySourceJsonItem = sourceJsonItem;
                if(!Array.isArray(val)) {
                    curKeySourceJsonItem = find(sourceJsonItem?.childrenSourceJson || [], {dataIndex: key})
                }
                const item = val[key];
                title?.push?.(curKeySourceJsonItem?.title || key);
                func(item, curKeySourceJsonItem, [...(title || [])])
            }
        }
    }

    func(val, sourceJsonItem, [])

    return res;
}

export const autoRender = (val: any, title?: DiffDataItem['title'], sourceJsonItem?: DiffDataItem['sourceJsonItem']) => {
    const label =renderLabel(title || []);
    
    if(isBasicData(val)) return <div key={label + val}>{`${label}: ${val}`}</div>;

    return (
        <div key={label + val}>
            <span>{label}: </span>
            <div style={{marginLeft: 40}}>
                {deepRender(val, sourceJsonItem)}
            </div>
        </div>
    );
  }


// interface 

// type MakeDiffTableDataType = () => []

// export const makeDiffTableData = () => {

// }


/**
 * [
 *  {
 *      dataIndex: 'title',
 *      render: () => reactNode, 
 *  },
 *  {
 *      dataIndex: 'old',
 *      render: () => reactNode, 
 *  }
 *  {
 *      dataIndex: 'new',
 *      render: () => ß, 
 *  }
 * ]
 */