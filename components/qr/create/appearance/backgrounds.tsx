import { cn, colourNameToHex } from "lib/utils";
import { QrCode } from "types";
import { Image, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "components/ui";
import { useBoardState } from "../boardStateContext";

interface BackgroundsProps {
  qrContent: QrCode;
}

const backgroundTypes = ["Flat Color", "Gradient", "Image"];
type BackgroundType = (typeof backgroundTypes)[number];

const Backgrounds = ({ qrContent }: BackgroundsProps) => {
  const { updateAppearance } = useBoardState();
  const [selected, setSelected] = useState(
    qrContent.background?.type || "Gradient"
  );

  const [color, setColor] = useState(qrContent.background?.color || "#9A2CF6");
  const [inputVal, setInputVal] = useState(
    qrContent.background?.color || "#9A2CF6"
  );
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

  const handleTypeClick = (type: BackgroundType) => {
    setSelected(type);
    updateAppearance("background", { type: type });
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement> | undefined
  ) => {
    let hex = color;
    if (e) {
      hex = colourNameToHex(e.target.value) || "";
    }
    if (hex) {
      setColor(hex);
      updateAppearance("background", { color: hex });
    }
  };

  return (
    <section
      className={cn(
        "create-card ",
        "my-5 p-10  gap-5 h-auto transform-all duration-1000 items-center"
      )}
    >
      <div className="flex flex-wrap w-full items-start justify-between">
        {backgroundTypes.map((bgtype, i) => {
          const isActive = selected === bgtype;
          return (
            <button
              key={bgtype}
              onClick={() => handleTypeClick(bgtype)}
              className={cn(
                "flex items-center flex-col w-[150px] h-[225px] animate-fade translate-all ease-linear",
                {
                  "p-2 border-2 border-black-100 rounded-lg duration-200 ":
                    isActive,
                }
              )}
            >
              <div
                className={cn(
                  "flex w-full h-full bg-gray-800 pacity-20 rounded-lg",
                  {
                    "bg-scrim-100 border-2 border-black-100 border-dashed":
                      bgtype === "Image",
                  },
                  {
                    "bg-gradient-to-b from-gray-600 to-gray-800":
                      bgtype === "Gradient",
                  }
                )}
              >
                {bgtype === "Image" && <Image className="mx-auto my-auto" />}
              </div>
              <p>{bgtype}</p>
            </button>
          );
        })}
      </div>
      <div className="flex p-1 self-start gap-5 ">
        <button
          id="ignore-clicks"
          onClick={() => setShowColor((prev) => !prev)}
        >
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
            setInputVal(e);
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
    </section>
  );
};

export default Backgrounds;
