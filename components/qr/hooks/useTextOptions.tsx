import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";
import { ColorOptions, hexToColors } from "../options/colors";
import { OptionModalInterface } from "../board";

interface MovableNewInputProps {
  id: number;
  handleOnFocus: (id: number) => void;
  handleOnBlur: () => void;
}

const MovableNewInput = forwardRef<HTMLInputElement, MovableNewInputProps>(
  ({ id, handleOnBlur, handleOnFocus }, ref) => {
    const handleTouchStart = (event: React.TouchEvent) => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.focus();
      }
    };
    return (
      <Draggable
        axis="both"
        handle={`.textDrag${id}`}
        defaultPosition={{ x: 0, y: 0 }}
        grid={[1, 1]}
        scale={1}
        bounds="parent"
      >
        <input
          onTouchStart={handleTouchStart}
          autoFocus
          id={`input-${id}`}
          onFocus={() => handleOnFocus(id)}
          ref={ref}
          onBlur={handleOnBlur}
          style={{ color: "black", fontFamily: "", fontSize: "20px" }}
          className={`textDrag${id} builder-line m-2 text-20`}
          placeholder="text"
        />
      </Draggable>
    );
  }
);

interface UseTextOptionsProps {
  openModal: (option: OptionModalInterface["option"]) => void;
  closeModal: () => void;
  showModal: OptionModalInterface;
}

const UseTextOptions = ({
  openModal,
  closeModal,
  showModal,
}: UseTextOptionsProps) => {
  const textRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [focusedInputId, setFocusedInputId] = useState<number | null>(null);
  const [textColor, setTextColor] = useState<ColorOptions>("black-100");
  const [textFont, setTextFont] = useState("");
  const [fontSize, setFontSize] = useState("20px");
  const [inputs, setInputs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!showModal.show) {
      const filteredInputs = inputs.filter((el) => {
        const key: number | null = parseInt(el.key || ""); // Access key property
        if (key !== null && textRefs.current[key]) {
          const ref = textRefs.current[key];
          if (ref && ref.value.trim() !== "") {
            return true; // Keep the element in the filtered array
          }
        }
        return false; // Exclude the element from the filtered array
      });

      setInputs(filteredInputs);
    }
  }, [showModal]);

  const extractStaticContent = () => {
    const result = [];
    for (const ref of textRefs.current) {
      if (ref) {
        const boundingRect = ref.getBoundingClientRect();

        const styles = {
          position: "absolute",
          top: ref.style.top || `${boundingRect.top}px`,
          left: ref.style.left || `${boundingRect.left}px`,
          width: ref.style.width || `${boundingRect.width}px`,
          height: ref.style.height || `${boundingRect.height}px`,
        };
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const data = {
          text: {
            value: ref.value,
            styles: {
              position: "absolute",
              top: `${(parseInt(styles.top) / screenHeight) * 100}%`,
              left: `${(parseInt(styles.left) / screenWidth) * 100}%`,
              width: `${(parseInt(styles.width) / screenWidth) * 100}%`,
              height: `${(parseInt(styles.height) / screenHeight) * 100}%`,
              color: ref.style.color,
              fontFamily: ref.style.fontFamily,
              fontSize: ref.style.fontSize,
            },
            className: ref.className,
          },
        };
        result.push(data);
      }
    }
    return result;
  };

  const handleOnFocus = (id: number) => {
    textRefs?.current[id]?.focus();
    const currentStyle = textRefs?.current[id]?.style;
    if (currentStyle?.color) {
      const tailwindColor = hexToColors[currentStyle?.color]; // convert hex color back to tailwind color
      setTextColor(tailwindColor);
    }
    setFontSize(currentStyle?.fontSize || "20px");
    setTextFont(currentStyle?.fontFamily || "");
    setFocusedInputId(id);
    openModal("text");
  };

  const handleOnBlur = () => {
    closeModal();
  };

  const addInput = () => {
    const newId = inputs.length;
    textRefs.current.push(null);

    setInputs((prevInputs) => [
      ...prevInputs,
      <MovableNewInput
        key={newId} // It's important to add a key when rendering a list of elements
        id={newId}
        handleOnBlur={handleOnBlur}
        handleOnFocus={handleOnFocus}
        ref={(ref) => {
          textRefs.current[newId] = ref;
        }}
      />,
    ]);

    setTimeout(() => {
      textRefs.current[newId]?.focus();
    }, 100);
  };

  return {
    extractStaticContent,
    setTextColor,
    setTextFont,
    addInput,
    setFontSize,
    fontSize,
    inputs,
    textColor,
    textFont,
    textRefs,
    focusedInputId,
  };
};

export default UseTextOptions;
