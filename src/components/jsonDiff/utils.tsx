import { DiffDataItem } from ".";

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
    }).join('-')
}

export const autoRender = (val: any, title: DiffDataItem['title']) => {
    const label =renderLabel(title);
    
    if(isBasicData(val)) return <div key={label + val}>{`${label}: ${val}`}</div>;

    return <span key={label + val}>{`${label} ${JSON.stringify(val)}`}</span>;
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