"use client";

interface TextData {
  value: string;
  styles: any;
  className: string;
}

interface TextItem {
  text: TextData;
}

import { useEffect, useState } from "react";

type HTMLTextTag = "a" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface Style {
  position: "absolute";
  top: string; // percentage value as a string
  left: string; // percentage value as a string
  right: string;
  color?: string; // optional because it can fallback to fontColor
  fontFamily?: string; // optional because it can fallback to fontFamily
  fontSize?: string; // optional because it can fallback to fontSize
  overflow: "hidden";
  boxSizing: "border-box";
  wordBreak: "break-word";
  width: string;
  height: string;
}

export interface Text {
  tag: HTMLTextTag;
  style: Style;
  className: string;
  href?: string;
  value: string;
  createdWidth: number;
  createdHeight: number;
}

interface ScanContentProps {
  html: Text[];
}

const ScanContent = ({ html }: ScanContentProps) => {
  const [isStylesReady, setIsStylesReady] = useState(false);
  const [styles, setStyles] = useState({});
  const [text, setText] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (html) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const data = [];
      for (const element of html) {
        const {
          fontFamily,
          fontSize,
          color,
          position,
          top,
          left,
          width,
          height,
          right,
          overflow,
          wordBreak,
          boxSizing,
        } = element.style;

        const l = parseInt(right) + parseInt(width);
        const g = element.createdWidth - l;
        console.log(left);

        const k = (parseFloat(left) / 100) * screenWidth;

        const s = {
          top: `${(parseFloat(top) / 100) * screenHeight}px`,
          left: `${(parseFloat(left) / 100) * screenWidth}px`,
          width,
          height,
          fontFamily,
          fontSize,
          color,
          position,
          overflow,
          wordBreak,
          boxSizing,
        };
        console.log({ s, screenWidth });
        if (element.tag === "a" && element.href) {
          const jsx = (
            <a href={element.href}>
              <div style={s} className={" text-center animate-fade  z-60"}>
                {element.value}
              </div>
            </a>
          );
          data.push(jsx);
        } else if (element.tag === "p") {
          const jsx = (
            <div style={s} className={`text-center animate-fade  z-60`}>
              {element.value}
            </div>
          );
          data.push(jsx);
        }
      }

      setText(data);
      setIsStylesReady(true);
    }
  }, [html]);

  if (!isStylesReady) {
    return <div>Loading...</div>; // Placeholder or loading indicator
  }

  return (
    <main className="min-w-screen min-h-screen flex justify-center items-center">
      {text.map((jsk) => jsk)}
      {/** Verticle Line */}
      <div className="flex h-full w-[2px] bg-black-100 absolute z-50" />
      {/** Horizontal Line */}
      <div className="flex h-[2px] w-full bg-black-100 absolute z-50" />
    </main>
  );
};

export default ScanContent;
