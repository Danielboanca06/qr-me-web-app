"use client";
import { Button } from "components/ui";
import { useEffect, useState } from "react";
import { cn } from "lib/utils";
import { useBoardState } from "../../boardStateContext";
interface LayoutProps {
  onBlur: () => void;
  selected: string;
  show: boolean;
  id: string;
}

const Layout = ({ id, onBlur, selected = "classic", show }: LayoutProps) => {
  const { updateLink } = useBoardState();
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (show) {
      setIsHidden(false);
    } else {
      timer = setTimeout(() => {
        setIsHidden(true);
      }, 250);
    }

    return () => clearTimeout(timer);
  }, [show]);
  const handleClick = (layout: string) => {
    updateLink({ id, layout });
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full gap-2 pb-10",

        { "animate-fade": show },
        { "animate-fade animate-reverse": !show },
        { hidden: isHidden }
      )}
    >
      <div className="bg-scrim-200 flex items-center justify-center h-11 rounded-md">
        <h1 className="text-16 font-semibold  text-center pl-5 mx-auto">
          Layout
        </h1>
        <Button
          onClick={onBlur}
          variant={"ghost"}
          size={"icon"}
          className="w-10 h-100 static  hover:bg-scrim-100"
        >
          &times;
        </Button>
      </div>

      <div className=" flex justify-evenly flex-col xl:mx-5 h-full  gap-5">
        <p className=" mx-5 ">Choose a layout for your link</p>
        <button
          className={cn(
            "flex items-center  border rounded-2xl py-5 mx-5 px-5 shadow-md",
            { "border-2 border-black-100 shadow-lg": selected === "classic" }
          )}
          onClick={() => handleClick("classic")}
        >
          <div
            className={cn(
              "border-black-100 min-w-6 min-h-6 rounded-full",
              selected === "classic" ? "border-[6px]" : "border-2"
            )}
          />
          <div className="flex justify-start flex-col ml-5 mr-auto">
            <h2 className="font-bold text-left text-14">Classic</h2>
            <p className="text-12 text-left font-thin">
              Efficient, direct and compact.
            </p>
          </div>
          <div className="w-[300px] h-20 bg-scrim-200 rounded-xl" />
        </button>
        <button
          className={cn(
            "flex items-center  border rounded-2xl py-5 mx-5 px-5 shadow-sm",
            { "border-2 border-black-100 shadow-lg": selected === "featured" }
          )}
          onClick={() => handleClick("featured")}
        >
          <div
            className={cn(
              "border-black-100 min-w-6 min-h-6  rounded-full",
              selected === "featured" ? "border-[6px]" : "border-2"
            )}
          />
          <div className="flex justify-start flex-col ml-5 mr-auto">
            <h2 className="font-bold text-left text-14">Featured</h2>
            <p className="text-12 text-left font-thin">
              Make your link stand out with a larger, more attractive display.
            </p>
          </div>
          <div className="w-[300px] h-20 bg-scrim-200 rounded-xl" />
        </button>
      </div>
    </div>
  );
};

export default Layout;
