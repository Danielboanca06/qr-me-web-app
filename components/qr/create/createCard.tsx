"use client";
import { Button } from "components/ui";
import Switch from "components/ui/switch";
import { cn, validLinkSchema } from "lib/utils";
import {
  GripVertical,
  Pencil,
  Trash2,
  Image as ImageIcon,
  LayoutTemplate,
  QrCode,
  MousePointerClick,
  LockKeyhole,
  Import,
} from "lucide-react";
import { useState } from "react";

import { LinkOptions, LinkOptionType } from "lib/constants";
import Layout from "./options/layout";
import Thumbnail from "./options/thumbnail";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useBoardState } from "./boardStateContext";

interface CreateCardProps {
  content: PageLinks | PageText;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

type DropDownType = LinkOptionType | "delete";

// Type guards to check the specific type of content
const isPageLinks = (content: PageLinks | PageText): content is PageLinks => {
  return (content as PageLinks).link !== undefined;
};
const isPageText = (content: PageLinks | PageText): content is PageText => {
  return (content as PageText).text !== undefined;
};

const CreateCard = ({ content, dragHandleProps }: CreateCardProps) => {
  const { updateLink, updateText, deleteContent } = useBoardState();

  //Title Input
  const [title, setTitle] = useState<{
    showInput?: boolean;
    inputValue?: string;
  }>({
    showInput: false,
    inputValue: isPageLinks(content) ? content.title : "",
  });

  //Link Input
  const [link, setLink] = useState<{
    showLink?: boolean;
    linkValue?: string;
    error?: boolean;
  }>({
    showLink: false,
    linkValue: isPageLinks(content) ? content.link : "",
    error: false,
  });

  //DropDown
  const [showOption, setShowOption] = useState<string>();

  //Title Input
  const handleTitleClick = () => {
    setTitle((prev) => ({ showInput: true, inputValue: prev.inputValue }));
  };
  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTitle({ showInput: false, inputValue: e.target.value });

    if (isPageLinks(content)) {
      updateLink({ id: content.id, title: e.target.value });
    } else {
      updateText({ id: content.id, text: e.target.value });
    }
  };

  //Link Input
  const handleLinkClick = () => {
    setLink((prev) => ({ showLink: true, linkValue: prev.linkValue }));
  };
  const handleLinkBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newLinkValue = e.target.value;
    setLink({ showLink: false, linkValue: newLinkValue });
    if (newLinkValue) {
      try {
        validLinkSchema.parse({ url: newLinkValue });
        updateLink({ id: content.id, link: newLinkValue });
      } catch (error) {
        setLink({ showLink: false, linkValue: newLinkValue, error: true });
      }
    }
  };

  //DropDown
  const handleDropDownClick = (option: DropDownType) => {
    setShowOption((prev) => (prev === option ? "" : option));
  };

  const handleCloseDropDown = () => {
    setShowOption("");
  };

  //Active Switch
  const handleActiveSwitch = (active: boolean) => {
    if (isPageLinks(content)) {
      updateLink({ id: content.id, active: active });
    } else {
      updateText({ id: content.id, active: active });
    }
  };

  //Delete Actions
  const handleDeleteClick = () => {
    deleteContent(content.id);
  };

  const getText = () => {
    if (isPageLinks(content)) {
      //see if there is already title
      if (content.title) return content.title;
      return "Title";
    } else {
      //see if there is already text
      if (content.text) return content.text;
      return "Headline Text";
    }
  };

  return (
    <section className="flex flex-col w-full  items-center bg-white-100 border-2 shadow-2xl rounded-3xl animate-fade min-w-[351px] flex-grow transform-all duration-1000">
      <div className="flex w-full flex-grow py-5 transform-all duration-1000 items-center ">
        <strong
          className="droppable mx-2 h-full flex flex-col justify-center cursor-grab cursor xl:py-8 py-5 "
          {...dragHandleProps}
        >
          <GripVertical size={20} />
        </strong>

        <div className="flex flex-grow flex-col gap-3  ">
          {/** Text/Title Input */}
          <div
            className={cn("flex items-center  flex-shrink xl:pl-5", {
              "self-center p-0": isPageText(content),
            })}
          >
            {!title.showInput && (
              <button
                className="flex gap-2 xl:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] max-w-[250px]  items-center   "
                onClick={handleTitleClick}
              >
                <p
                  className={cn(
                    "w-hidden text-ellipsis  w-full  whitespace-nowrap overflow-hidden ",
                    {
                      "text-scrim-600": !title.inputValue,
                    }
                  )}
                >
                  {getText()}
                </p>
                <Pencil size={20} strokeWidth={1.5} className="" />
              </button>
            )}
            {title.showInput && (
              <input
                autoFocus
                type="text"
                className={cn("flex text-[16px] w-[90%] px-auto outline-none", {
                  "text-center": isPageText(content),
                })}
                onBlur={handleTitleBlur}
                defaultValue={title.inputValue}
              />
            )}
          </div>

          {/** Link Input */}
          <div
            className={cn("flex  flex-col xl:pl-5 ", {
              hidden: isPageText(content),
            })}
          >
            <div className="relative w-full flex flex-col">
              <div className="flex items-center w-full">
                {!link.showLink && (
                  <button
                    className="flex gap-2 xl:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] max-w-[250px]  items-center   "
                    onClick={handleLinkClick}
                  >
                    <p
                      className={cn(
                        "w-hidden text-ellipsis w-full whitespace-nowrap overflow-hidden ",
                        {
                          "text-scrim-600": !link.linkValue,
                        },
                        {
                          "text-red-500": link.error,
                        }
                      )}
                      aria-placeholder="hello"
                    >
                      {link.linkValue || "URL"}
                    </p>
                    <Pencil size={20} strokeWidth={1.5} className="" />
                  </button>
                )}
                {link.showLink && (
                  <input
                    autoFocus
                    type="text"
                    className="text-[16px]  w-hidden w-full outline-none"
                    onBlur={handleLinkBlur}
                    defaultValue={link.linkValue}
                  />
                )}
              </div>
              {link.error && (
                <p className="text-red-500 text-12">Please enter a valid URL</p>
              )}
            </div>
          </div>

          <div
            className={cn("flex xl:pl-3  min-w-full gap-5", {
              hidden: isPageText(content),
            })}
          >
            {LinkOptions.map((option) => {
              const isActive = showOption === option;
              return (
                <Button
                  key={option}
                  onClick={() => handleDropDownClick(option)}
                  variant={"ghost"}
                  size={"icon"}
                  className={cn("rounded-md", {
                    "bg-secondary-100 hover:bg-tertiary-100": isActive,
                  })}
                >
                  {option === "layout" && (
                    <LayoutTemplate
                      size={20}
                      strokeWidth={1.5}
                      color={isActive ? "white" : "black"}
                    />
                  )}
                  {option === "thumbnail" && (
                    <ImageIcon
                      size={20}
                      strokeWidth={1.5}
                      color={isActive ? "white" : "black"}
                    />
                  )}
                  {/* {option === "lock" && (
                    <LockKeyhole
                      size={20}
                      strokeWidth={1.5}
                      color={isActive ? "white" : "black"}
                    />
                  )} */}
                  {option === "qrCode" && (
                    <QrCode
                      size={20}
                      strokeWidth={1.5}
                      color={isActive ? "white" : "black"}
                    />
                  )}
                  {option === "clicks" && (
                    <MousePointerClick
                      size={20}
                      strokeWidth={1.5}
                      color={isActive ? "white" : "black"}
                    />
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="static flex flex-col gap-5 mr-5 items-end ">
          <Switch
            onCheckedChange={handleActiveSwitch}
            checked={content.active}
          />

          <Button
            variant={"ghost"}
            size={"icon"}
            className="w-10 h-10"
            onClick={() => handleDropDownClick("delete")}
          >
            <Trash2 strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {isPageLinks(content) && (
        <div
          className={cn(
            "overflow-hidden delay-75 transition-all duration-800 w-full h-full animate-ease-linear ",
            showOption ? "max-h-[1000px]" : "max-h-0"
          )}
        >
          <Layout
            show={showOption === "layout"}
            id={content.id}
            onBlur={handleCloseDropDown}
            selected={content.layout}
          />
          <Thumbnail
            show={showOption === "thumbnail"}
            id={content.id}
            onBlur={handleCloseDropDown}
            thumbnailImg={content.thumbnail}
          />
        </div>
      )}
      <div
        className={cn(
          "overflow-hidden delay-75 transition-all duration-800 animate-ease-linear flex w-full h-full",
          showOption ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        {showOption === "delete" && (
          <div className="flex flex-col w-full gap-2 pb-5 animate-fade">
            <div className="bg-scrim-200 flex items-center justify-center  h-11 rounded-md">
              <h1 className="text-16 font-semibold pl-5 mx-auto">Delete</h1>
              <Button
                onClick={handleCloseDropDown}
                variant={"ghost"}
                size={"icon"}
                className="w-10 h-10  hover:bg-scrim-100"
              >
                &times;
              </Button>
            </div>
            <div className="flex pt-5 w-full justify-around text-14  ">
              <div className="flex flex-col items-center ">
                <Button
                  onClick={handleDeleteClick}
                  variant={"outline"}
                  className="flex gap-2 rounded-xl "
                >
                  <Trash2 />
                  Delete
                </Button>
                <p className="opacity-50">Delete Forever.</p>
              </div>
              <div className="flex flex-col items-center  ">
                <Button
                  className="flex gap-2 w-full rounded-xl  text-white-100"
                  onClick={() =>
                    alert(
                      "❗Sorry This Feature is not available yet❗ \n 👷Comming Soon👷"
                    )
                  }
                >
                  <Import />
                  Archive
                </Button>
                <p className="opacity-50">
                  Reduce clutter, and restore anytime.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CreateCard;
