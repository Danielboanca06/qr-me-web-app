import { Button } from "components/ui";
import { cn } from "lib/utils";
import { Image, Pen, Type } from "lucide-react";
import { useEffect, useState } from "react";
import Font from "./options/font";

export type OptionNames = "text" | "image" | "pen";
type OptionData = {
  icon: JSX.Element;
  name: OptionNames;
};

const data: OptionData[] = [
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
interface OptionBarProps {
  onClick?: (selected: OptionData["name"]) => void;
  setSelected?: OptionData["name"];
  disabled?: boolean;
  hide?: boolean;
}

const OptionBar = ({ onClick }: OptionBarProps) => {
  const [selectedIn, setSelectedIn] = useState<null | number>(null);
  const handeleClick = (name: OptionData["name"], index: number) => {
    if (selectedIn === index) {
      setSelectedIn(null);
    } else {
      setSelectedIn(index);
    }
    if (onClick) onClick(name);
  };

  return (
    <>
      {/* Options Bar */}
      <div className={cn("flex flex-col fixed z-1000 right-10 gap-5")}>
        {data.map(({ icon, name }, i) => (
          <Button
            className={cn(
              "w-11 h-11",
              selectedIn !== null &&
                selectedIn === i &&
                "border-2 border-black-100 bg-scrim-200",
              selectedIn !== null && selectedIn !== i && "hidden"
            )}
            onClick={() => handeleClick(name, i)}
            key={name}
            variant={"ghost"}
            size={"icon"}
          >
            {icon}
          </Button>
        ))}
      </div>
    </>
  );
};

export default OptionBar;
