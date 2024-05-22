import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cascader from "./components/Cascader";
import jsonDiff, { DiffDataItem } from './components/jsonDiff'
import { curData, preData,sourceJsonMap } from "./components/jsonDiff/config";
import { autoRender, isBasicData, renderLabel } from "./components/jsonDiff/utils";

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
  const [diffData, setDiffData] = useState<DiffDataItem[]>([])

  useEffect(() => {
    const diffData = jsonDiff(preData, curData, sourceJsonMap)

    console.log(diffData)
    setDiffData(diffData)
  },[])

  const renderDiffItem = (diffItem: DiffDataItem) => {
    const {title, margeDiffData, oldValue, newValue, sourceJsonItem} = diffItem || {}
    const render = sourceJsonItem?.render;

    if(render) return [[render(oldValue, diffItem)], [render(newValue, diffItem)]];

    if(margeDiffData && !!margeDiffData.length) {
      const res: any[][] = [[], []]
      margeDiffData.map((curDiffItem) => {
        const [margeOld, margeNew] = renderDiffItem(curDiffItem);
        res?.[0]?.push(margeOld)
        res?.[1]?.push(margeNew)
        return null;
      })
      
      const label =renderLabel(title);

      return [[
        <div key={label + 'old'}>
          {`${label}: `}
          <div style={{marginLeft: '40px'}}>{res[0]}</div>
        </div>
      ],[
        <div key={label + 'new'}>
          {`${label}: `}
          <div style={{marginLeft: '40px'}}>{res[1]}</div>
        </div>
      ]];
    }

    return [[autoRender(oldValue, title, sourceJsonItem)], [autoRender(newValue, title, sourceJsonItem)]]
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <div style={{width: '80%'}}>
          <div style={{display: "flex", 'textAlign': 'start', color: 'orange'}}>
                <div style={{flex: 1}}>oldValue</div>
                <div  style={{flex: 1}}>newValue</div>
              </div>
            {diffData.map((diffItem, index) => {
              const data = renderDiffItem(diffItem)
              const oldR = data?.[0] || null;
              const newR = data?.[1] || null;
              return <div key={index} style={{display: "flex", 'textAlign': 'start'}}>
                <div style={{width: '50%'}}>{oldR}</div>
                <div  style={{width: '50%'}}>{newR}</div>
              </div>
            })}
          </div>
        {/* <Cascader
          onChange={(val) => {
            // console.log(JSON.stringify(val));
            setValue(val as any);
          }}
          // value={value}
          options={options}
        /> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
