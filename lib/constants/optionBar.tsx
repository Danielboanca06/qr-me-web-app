import { Type, Image, Pen } from "lucide-react";

export type OptionNames = "text" | "image" | "pen";
type OptionData = {
  icon: JSX.Element;
  name: OptionNames;
};

export const optionBarData: OptionData[] = [
  {
    icon: <Type />,
    name: "text",
  },
  {
    icon: <Image />,
    name: "image",
  },
  {
    icon: <Pen />,
    name: "pen",
  },
];
