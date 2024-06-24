import { Button } from "components/ui";
import { cn } from "lib/utils";
import { use, useEffect, useState } from "react";
import Colors, { ColorOptions } from "./colors";
import Image from "next/image";
import { Link } from "lucide-react";
const fontOption = [
  "",
  "helvetica",
  "didot",
  "bodoni",
  "baskerville",
  "garamond",
  "times",
  "lubalin",
  "newYork",
  "minion",
  "georgia",
  "futura",
  "avenir",
  "montserrat",
  "frutiger",
  "newsGothic",
  "gotham",
  "gilroy",
];

interface FontProps {
  onColorButtonPress: () => void;
  onFontPress: (font: string | "") => void;
  onLinkPress: () => void;
  selectedColor?: ColorOptions;
  selectedFont?: string;
}

const font = ({
  onColorButtonPress,
  onFontPress,
  onLinkPress,
  selectedColor,
  selectedFont,
}: FontProps) => {
  const [selectedIn, setSelectedIn] = useState<null | number>(0);

  useEffect(() => {
    setSelectedIn(fontOption.indexOf(selectedFont || ""));
  }, [selectedFont]);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>, i: number) => {
    e.persist();
    setSelectedIn(i);
    onFontPress(fontOption[i]);
  };
  return (
    <div className="flex flex-row h-min overflow-x-auto py-5  items-center ">
      <div className="flex items-center px-10 gap-5">
        <button
          onMouseDown={(e) => e.preventDefault()}
          className={cn("h-8 w-8 rounded-full", `bg-${selectedColor}`)}
          onClick={() => onColorButtonPress()}
        />
        <Button
          onMouseDown={(e) => e.preventDefault()}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full w-10 h-10"
          onClick={() => onLinkPress()}
        >
          <Link size={25} color="#5077F5" />
        </Button>
      </div>

      <div className="flex flex-row  overflow-x-auto  no-scrollbar space-x-4 ">
        {fontOption.map((option, i) => (
          <Button
            onMouseDown={(e) => e.preventDefault()}
            key={option}
            onClick={(e) => handleOnClick(e, i)}
            variant={"outline"}
            className={cn(
              "text-[20px]",
              selectedIn !== i && "border-0",
              `font-${option}`
            )}
          >
            {"Abc"}
          </Button>
        ))}
      </div>
      {/* <Colors /> */}
    </div>
  );
};

export default font;
