import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { HexColorPicker } from "react-colorful";
import { X } from "lucide-react";
import { cn, colourNameToHex } from "lib/utils";

interface ColorProps {
  initialColor?: string;
  onChange?: (color: string) => any;
}

const Color = ({ initialColor, onChange }: ColorProps) => {
  const [color, setColor] = useState(initialColor || "#9A2CF6");
  const [inputVal, setInputVal] = useState(initialColor || "#9A2CF6");
  const [showColor, setShowColor] = useState(false);
  const [hidden, setHidden] = useState(false);
  const colorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setHidden((prev) => !prev);
      const height = colorRef.current?.offsetTop;
      if (height !== undefined) {
        console.log("scrolling to", height);
        window.scrollTo({
          top: height,
          behavior: "smooth",
        });
      }
    }, 200);
  }, [showColor]);

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement> | undefined
  ) => {
    let hex = color;
    if (e) {
      hex = colourNameToHex(e.target.value) || "";
    }
    if (hex) {
      setColor(hex);
      if (onChange) onChange(hex);
    }
  };
  return (
    <>
      <div className="flex p-1 self-start gap-5 ">
        <button onClick={() => setShowColor((prev) => !prev)}>
          <div
            className="w-10 h-10 rounded-md "
            style={{ background: color }}
          />
        </button>
        <Button className="flex flex-col items-start border-none  bg-scrim-200  rounded-lg m-auto hover:bg-scrim-200 ">
          <p className="text-12 font-light">Color</p>
          <input
            className="outline-none max-w-[100px] bg-scrim-200  text-14"
            onBlur={(e) => handleInputBlur(e)}
            onChange={(e) => setInputVal(e.target.value)}
            defaultValue={color}
            value={inputVal}
          />
        </Button>
      </div>

      <div
        ref={colorRef}
        className={cn(
          "w-full h-full self-start gap-1 flex  ",
          " delay-75 transition-all duration-800 animate-ease-linear flex ",
          showColor ? "max-h-[1000px]" : "max-h-0",
          {
            "delay-75 animate-fade animate-reverse": !showColor,
            "animate-fade": showColor,
            hidden: hidden,
          }
        )}
      >
        <HexColorPicker
          color={color}
          onChange={(e) => {
            setColor(e);
          }}
          onMouseUp={() => handleInputBlur(undefined)}
          onTouchEnd={() => handleInputBlur(undefined)}
          onMouseLeave={() => handleInputBlur(undefined)}
        />
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setShowColor(false)}
        >
          <X size={15} />
        </Button>
      </div>
    </>
  );
};

export default Color;
