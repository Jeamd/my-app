import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Cascader from "./components/Cascader";
import './components/jsonDiff'

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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Cascader
          onChange={(val) => {
            // console.log(JSON.stringify(val));
            setValue(val as any);
          }}
          // value={value}
          options={options}
        />
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
