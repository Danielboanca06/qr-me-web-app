"use client";

interface TextData {
  value: string;
  styles: any;
  className: string;
}

interface TextItem {
  text: TextData;
}

import { cn } from "lib/utils";
import { useEffect, useState } from "react";

const ScanContent = ({ html }) => {
  const [isStylesReady, setIsStylesReady] = useState(false);
  const [styles, setStyles] = useState({});
  const [text, setText] = useState<TextData[]>([]);

  useEffect(() => {
    if (html) {
      // setStyles(html.text.styles);
      // setText
      // console.log({ html });
      setIsStylesReady(true);
      setText(html);
    }
  }, [html]);

  if (!isStylesReady) {
    return <div>Loading...</div>; // Placeholder or loading indicator
  }
  const computedStyles = (style: any) => {
    return {
      position: "absolute",
      top: styles.top || "0px", // Default to 0px if not defined
      left: styles.left || "0px",
      width: styles.width || "auto",
      height: styles.height || "auto",
      color: styles.color || "black",
      fontFamily: styles.fontFamily,
    };
  };

  return (
    <main className="flex-1 h-screen mt-10 builder-line">
      {text.map(({ text }, i) => {
        // console.log(text.text.value);
        return (
          <div key={i} style={text.styles} className={cn(text.className, "")}>
            {text.value}
          </div>
        );
      })}
    </main>
  );
};

export default ScanContent;
