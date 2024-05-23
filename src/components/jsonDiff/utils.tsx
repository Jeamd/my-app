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

/**
 * 递归地过滤对象中所有值为 null 的属性
 * @param {Object} obj - 要过滤的对象
 * @returns {Object} - 过滤后的对象
 */
export function filterNull(obj: any, map = new Map()) {
    // 如果传入的不是对象，则直接返回
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (map.get(obj)) {
        return map.get(obj);
    }
    // 递归地处理对象的每个属性
    const result = new obj.constructor();
    map.set(obj, result);
    for (const key in obj) {
        // 如果属性值不为 null 和 0，则递归地处理它
        // if (checkTypeData(obj[key])obj[key] !== null && obj[key] !== 0 && obj[key] !== undefined) {
        if (checkTypeData(obj[key])) {
            const value = filterNull(obj[key], map);
            if (checkTypeData(value)) {
                result[key] = value;
            }
        }
    }
    return checkTypeData(result);
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