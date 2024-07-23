"use client";
import { cn } from "lib/utils";
import { useState } from "react";

import Color from "components/ui/color";
import { useBoardState } from "../boardStateContext";

const variants = ["Fill", "Outline", "Soft Shadow", "Hard Shadow"];
const borders = ["rounded-sm", "rounded-xl", "rounded-full"];

const buttonBoardVariants = {
  Fill: "bg-black-100",
  Outline: "border-[1.5px] border-black-100",
  "Soft Shadow": "shadow-3xl",
  "Hard Shadow": "border-[1.5px] border-black-100 shadow-block",
};
export type ButtonBoardVariantsType = typeof buttonBoardVariants;

const ButtonCard = () => {
  const { qrContent, updateAppearance } = useBoardState();
  const [selected, setSelected] = useState<{ type: string; border: string }>({
    type: qrContent.button?.type!,
    border: qrContent.button?.raduis!,
  });

  const handleButtonClick = (type: string, border: string) => {
    setSelected({ type, border });
    updateAppearance("button", { type: type, raduis: border });
  };

  return (
    <section
      className={cn(
        "create-card",
        "p-10 gap-5 h-auto transform-all duration-1000 items-center"
      )}
    >
      <div className="flex flex-col w-full gap-5">
        {variants.map((type) => (
          <div key={type} className="flex flex-col w-full items-start gap-5 ">
            <h3 className=" font-semibold ">{type}</h3>
            <div
              key={type}
              className="flex flex-wrap w-full justify-between gap-10 "
            >
              {borders.map((border) => {
                const isSelected =
                  selected?.type === type && selected?.border === border;
                return (
                  <div
                    key={border}
                    className={cn("transition-all flex flex-grow h-10 ", {
                      "ring-2 ring-offset-8 rounded-sm ring-black-100":
                        isSelected,
                    })}
                  >
                    <button
                      onClick={() => handleButtonClick(type, border)}
                      className={cn(
                        border,
                        buttonBoardVariants[
                          type as keyof ButtonBoardVariantsType
                        ],
                        "flex flex-grow  min-w-[100px]"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="self-start py-2">
        <h3 className="font-semibold ">Button color</h3>
        <Color
          initialColor={qrContent.button?.color}
          onChange={(color) => updateAppearance("button", { color: color })}
        />
      </div>
      <div className="self-start py-2">
        <h3 className="font-semibold ">Font color</h3>
        <Color
          initialColor={qrContent.button?.fontColor}
          onChange={(color) => updateAppearance("button", { fontColor: color })}
        />
      </div>
    </section>
  );
};

export default ButtonCard;
