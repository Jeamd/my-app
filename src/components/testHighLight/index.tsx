import KeywordHighLight from "keywords-highlight-html";
import { useCallback, useEffect, useState } from "react";
import { data } from "./test";
import "./style.css";

const Highlight = () => {
  const [html, setHtml] = useState<string>("");

  const setHighLightStringDom = useCallback(async (html: string) => {
    const highlightDom = await KeywordHighLight(html, [
      {
        word: "JavaScript",
        transformer: (node) => `<span class="high-light">${node}</span>`,
      },
    ]);
    setHtml(highlightDom);
  }, []);

  useEffect(() => {
    const html = data || "";
    setHighLightStringDom(html);
  }, [setHighLightStringDom]);

  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default Highlight;
