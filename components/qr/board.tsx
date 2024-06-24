"use client";
import {
  FormEvent,
  FormEventHandler,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "components/ui";
import { updateHtml } from "lib/actions/qr-code";
import { cn } from "lib/utils";
import Font from "./options/font";
import Colors, { ColorOptions, colorsToHex } from "./options/colors";
import { optionBarData, OptionNames } from "lib/constants/optionBar";
import UseTextOptions from "./hooks/useTextOptions";
import * as Slider from "@radix-ui/react-slider";

export interface OptionModalInterface {
  show?: boolean;
  option?: null | OptionNames;
  animation?: string; // "animate-fadeDown" | "animate-fadeUp";
}

const Board = () => {
  const sliderRef = useRef<LegacyRef<HTMLSpanElement> | null>();
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showModal, setShowModal] = useState<OptionModalInterface>({
    // is setting show to false set option to null
    show: false,
    option: null,
    animation: "",
  });

  const openModal = (option: OptionModalInterface["option"]) => {
    setShowModal({
      show: true,
      option: option,
      animation: "animate-fade-up",
    });
  };

  const closeModal = () => {
    setShowModal((prev) => ({
      show: true,
      option: prev.option,
      animation: "animate-fade animate-duration-300 animate-reverse",
    }));
    setTimeout(() => {
      setShowModal({
        show: false,
        option: null,
      });
      setShowColorOptions(false);
    }, 300);
  };

  const {
    extractStaticContent,
    setTextColor,
    setTextFont,
    addInput,
    setFontSize,
    fontSize,
    textColor,
    textFont,
    textRefs,
    focusedInputId,
    inputs,
  } = UseTextOptions({ openModal, closeModal, showModal });

  const handleOptionBarClick = (option: OptionNames) => {
    switch (option) {
      case "text":
        if (showModal.option === "text" && showModal.show) {
          closeModal();
        } else {
          openModal("text");
          addInput();
        }
        break;
      case "image":
        if (showModal.option === "image" && showModal.show) {
          closeModal();
        } else {
          openModal("image");
        }
        break;
      case "pen":
        break;
    }
  };
  const handleSliderChange = (value: number[]) => {
    if (focusedInputId !== null && textRefs.current[focusedInputId]) {
      textRefs.current[focusedInputId].style.fontSize = value.toString() + "px";
      // textRefs.current[focusedInputId].focus();
      setFontSize(value.toString() + "px");
    }
  };

  const onSubmit = () => {
    const content = extractStaticContent();
    // Send `content` to the database here
    console.log("Static Content:", content);
    const c = JSON.stringify(content);
    updateHtml(c, "6672ecd8bd5fbdb94e55a79b");
  };

  const handleFontPress = (font: string) => {
    if (focusedInputId !== null && textRefs.current[focusedInputId]) {
      textRefs.current[focusedInputId].focus();
      textRefs.current[focusedInputId].style.fontFamily = font;
      setTextFont(font);
    }
  };

  const handleColorButtonPress = () => {
    setShowColorOptions(true);
  };

  const handleColorPress = (color: ColorOptions) => {
    const hexColor = colorsToHex[color]; // convert tailwind color to hex for style color
    if (focusedInputId !== null && textRefs.current[focusedInputId]) {
      textRefs.current[focusedInputId].style.color = hexColor;
      textRefs.current[focusedInputId].focus();
      setTextColor(color);
    }
  };

  return (
    <main
      className={cn(
        "w-full min-h-screen relative builder-line top-[25px] flex flex-col items-center",
        showModal.show && "mb-[110px]"
      )}
    >
      {inputs.map((input, index) => input)}

      <Button
        onClick={onSubmit}
        className="absolute bottom-1"
        type="submit"
        style={{ fontFamily: "bodoni" }}
      >
        Submit
      </Button>

      {/* Options Bar */}
      <div
        className={cn(
          "flex flex-col fixed z-1000 right-10 gap-5 items-center  animate-fade top-40"
        )}
      >
        {optionBarData.map(({ icon, name }, i) => (
          <Button
            onMouseDown={(e) => e.preventDefault()}
            className={cn(
              "w-11 h-11 drop-shadow-xl animate-fade ",

              showModal.option === name &&
                "border-2 border-black-100 bg-scrim-200",

              name !== showModal.option &&
                showModal.option !== null &&
                "animate-reverse hidden"
            )}
            onClick={() => handleOptionBarClick(name)}
            key={name}
            variant={"ghost"}
            size={"icon"}
          >
            {icon}
          </Button>
        ))}
        {showModal.option === "text" && (
          <form>
            <Slider.Root
              ref={sliderRef.current}
              value={[parseInt(fontSize)]}
              onValueChange={handleSliderChange}
              onMouseDown={(e) => e.preventDefault()}
              className="relative flex flex-col  items-center select-none touch-none h-[200px] w-2 "
              defaultValue={[20]}
              max={65}
              min={14}
              step={1}
              orientation="vertical"
              // onValueChange={handleSliderChange}
            >
              <Slider.Track
                onMouseDown={(e) => e.preventDefault()}
                className="bg-tertiary-100  relative grow rounded-full h-full w-2 "
              >
                <Slider.Range
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute bg-black-100 rounded-full  w-2"
                />
              </Slider.Track>
              <Slider.Thumb
                onMouseMove={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                className="block  w-6 h-6  bg-secondary-100 shadow-[0_2px_10px] shadow-blackA4 rounded-[12px] focus:outline-none focus:shadow-[0_0_0_1px] focus:shadow-blackA5"
                aria-label="Volume"
              />
            </Slider.Root>
          </form>
        )}
      </div>

      {/* Bottom Modal */}
      <div
        className={cn(
          `flex fixed z-1000 bottom-0 bg-white-100 w-screen border-t-2 rounded-t-xl ${showModal.animation}`,

          !showModal.show && "opacity-0 z-0"
        )}
      >
        {showColorOptions && (
          <Colors
            onExitPress={() => setShowColorOptions(false)}
            onColorPress={handleColorPress}
          />
        )}
        {!showColorOptions && showModal.option === "text" && (
          <Font
            selectedColor={textColor}
            onFontPress={handleFontPress}
            onColorButtonPress={handleColorButtonPress}
            onLinkPress={() => {}}
            selectedFont={textFont}
          />
        )}
      </div>
    </main>
  );
};

export default Board;
