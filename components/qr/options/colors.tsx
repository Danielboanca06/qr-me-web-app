import { useState } from "react";
import { cn } from "lib/utils";
import { Button } from "components/ui";
import { X } from "lucide-react";

export const colorsToHex: { [key: string]: string } = {
  "black-100": "black",
  "white-100 border-2": "white",
  "red-600": "red",
  "yellow-400": "yellow",
  "green-600": "green",
  "blue-600": "blue",
  "purple-600": "purple",
  "red-400": "#f87171",
  "yellow-200": "#fef08a",
  "green-300": "#bef264",
  "cyan-400": "#06b6d4",
  "violet-400": "#a78bfa",
};

export const hexToColors: { [key: string]: ColorOptions } = {
  black: "black-100",
  white: "white-100 border-2",
  red: "red-600",
  yellow: "yellow-400",
  green: "green-600",
  blue: "blue-600",
  purple: "purple-600",
  "#f87171": "red-400",
  "#fef08a": "yellow-200",
  "#bef264": "green-300",
  "#06b6d4": "cyan-400",
  "#a78bfa": "violet-400",
};

export type ColorOptions =
  | "black-100"
  | "white-100 border-2"
  | "red-600"
  | "yellow-400"
  | "green-600"
  | "blue-600"
  | "purple-600"
  | "red-400"
  | "yellow-200"
  | "green-300"
  | "cyan-400"
  | "violet-400";

const colors: ColorOptions[] = [
  // when adding colors add to safelist in tailwind.config.ts
  "black-100",
  "white-100 border-2",
  "red-600",
  "yellow-400",
  "green-600",
  "blue-600",
  "purple-600",
  "red-400",
  "yellow-200",
  "green-300",
  "cyan-400",
  "violet-400",
];

interface ColoursProps {
  onColorPress: (color: ColorOptions) => void;
  onExitPress: () => void;
}

const Colors = ({ onColorPress, onExitPress }: ColoursProps) => {
  const [selectedColor, setSelectedColor] = useState("black-100");
  const handelClick = (color: ColorOptions) => {
    setSelectedColor(color);
    onColorPress(color);
  };
  const getBorder = (currentColor: ColorOptions) => {
    if (currentColor === selectedColor) {
      if (currentColor === "black-100") {
        return "border-[6px] border-neutral-500 ";
      }
      return "border-[6px] border-black-100 ";
    }
  };
  return (
    <div className=" flex flex-row  overflow-x-auto  h-full gap-5 no-scrollbar items-center builder-line">
      <Button
        onClick={() => onExitPress()}
        variant={"ghost"}
        size={"icon"}
        className="rounded-full w-10 h-10 ml-10"
        onMouseDown={(e) => e.preventDefault()}
      >
        <X />
      </Button>
      {colors.map((color) => (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => handelClick(color)}
          className={cn(`p-5 rounded-full bg-${color}`, getBorder(color))}
        />
      ))}
    </div>
  );
};

export default Colors;
