import { cn } from "lib/utils";
import { QrCode } from "types";
import { Image, X } from "lucide-react";
import { useState } from "react";
import { useBoardState } from "../boardStateContext";
import Color from "components/ui/color";

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
  const handleTypeClick = (type: BackgroundType) => {
    setSelected(type);
    updateAppearance("background", { type: type });
  };

  return (
    <section
      className={cn(
        "create-card ",
        "my-5 p-10  gap-5 h-auto transform-all duration-1000 items-center"
      )}
    >
      <div className="flex flex-wrap w-full items-start   justify-between  gap-5">
        {backgroundTypes.map((bgtype, i) => {
          const isActive = selected === bgtype;
          return (
            <button
              key={bgtype}
              onClick={() => handleTypeClick(bgtype)}
              className={cn(
                "flex items-center flex-col w-[150px] h-[225px] animate-fade translate-all ease-linear mx-auto",
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
              <p className="font-semibold">{bgtype}</p>
            </button>
          );
        })}
      </div>
      <div className="self-start py-2">
        <h3 className="font-semibold ">Color</h3>
        <Color
          initialColor={qrContent.background?.color}
          onChange={(color) => updateAppearance("background", { color: color })}
        />
      </div>
    </section>
  );
};

export default Backgrounds;
