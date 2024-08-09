"use client";
import Link from "next/link";
import { cn } from "lib/utils";
import { ButtonBoardType, PageLinks } from "types";
import { buttonBoardVariants } from "lib/constants";
import useResizeObserver from "lib/hooks/useResizeObserver";
import { ButtonBoardVariantsType } from "../appearance/buttonCard";
import Image from "next/image";

interface DisplayCardProps {
  content: PageLinks;
  buttonStyle: ButtonBoardType;
}

const DisplayCard = ({ content, buttonStyle }: DisplayCardProps) => {
  const [ref, size] = useResizeObserver<HTMLAnchorElement>();
  if (!content.thumbnail.url && !content.title && !content.link) {
    return;
  }
  if (content.layout === "featured") {
    return (
      <Link
        ref={ref}
        className={cn(
          "flex  max-w-[550px] overflow-hidden relative items-center w-full h-[200px] rounded-3xl shadow-full",
          buttonBoardVariants[
            (buttonStyle.type as keyof ButtonBoardVariantsType) || "Fill"
          ],
          { "h-[300px]": size.width > 540 },
          `${
            buttonStyle.radius === "rounded-full"
              ? "rounded-[30px]"
              : buttonStyle.radius
          }`
        )}
        style={{
          backgroundColor:
            buttonStyle.type !== "Outline" ? buttonStyle.color : "transparent",

          borderColor:
            buttonStyle.type === "Outline" ? buttonStyle.color : "transparent",
        }}
        key={`link-${content.id}`}
        id={`link-${content.id}`}
        href={content.link}
      >
        {content.thumbnail.url && (
          <img
            src={content?.thumbnail.url}
            alt={"Uploaded Image" + content.thumbnail.fileName}
            className={`flex w-full h-full  border-2 border-black-100 text-[8px] text-center size-full z-0 ${
              buttonStyle.radius === "rounded-full"
                ? "rounded-[30px]"
                : buttonStyle.radius
            }`}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
        <div className=" absolute bottom-2 px-5 z-10 flex-1 flex justify-center">
          <h1
            style={{ color: buttonStyle.fontColor }}
            className="text-white-100 text-14"
          >
            {content.title}
          </h1>
        </div>
      </Link>
    );
  }
  return (
    <Link
      className={cn(
        "flex items-center max-w-[550px] overflow-hidden relative w-full  py-1 max-h-fit bg-tertiary-100 border-2 border-black-100 rounded-3xl shadow-full hover:shadow-3xl hover:opacity-90",
        buttonBoardVariants[
          (buttonStyle.type as keyof ButtonBoardVariantsType) || "Fill"
        ],

        buttonStyle.radius
      )}
      style={{
        backgroundColor:
          buttonStyle.type !== "Outline" ? buttonStyle.color : "transparent",

        borderColor:
          buttonStyle.type === "Outline" ? buttonStyle.color : "transparent",
      }}
      key={`link-${content.id}`}
      id={`link-${content.id}`}
      href={content.link}
    >
      {content.thumbnail.url && (
        <img
          src={content?.thumbnail.url}
          alt={"Uploaded Image" + content.thumbnail.fileName}
          className="w-10 z-0  h-10 rounded-full ml-1 text-[5px] text-center"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
      <div className="flex-1 flex justify-center">
        <h1
          style={{ color: buttonStyle.fontColor }}
          className="text-white-100 text-14 text-center"
        >
          {content.title}
        </h1>
      </div>
      {content.thumbnail.url && <div className="w-[40px]" />}
    </Link>
  );
};

export default DisplayCard;
