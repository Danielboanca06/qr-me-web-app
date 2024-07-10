import {
  updatedQrPageContent,
  updateQrCode,
  updateQrPageProfile,
} from "lib/actions/qr-code";
import { genId } from "lib/utils";
import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { PageLinks, PageText, QrCode } from "types";

interface BoardStateContextProps {
  qrContent: QrCode;
  addContent: (type: "link" | "text") => void;
  deleteContent: (id: string) => void;
  updateLink: (data: UpdatePageLinks) => void;
  updateText: (data: UpdatePageText) => void;
  reorder: (sourceIndex: number, destinationIndex: number) => void;
  updateOwner: (data: QrCode["ownerDetails"]) => void;
}

const BoardStateContext = createContext<BoardStateContextProps | undefined>(
  undefined
);

type ActionType =
  | { type: "ADD_LINK"; id: string }
  | { type: "DELETE"; id: string }
  | {
      type: "UPDATE_LINK";
      id: string;
      title?: string;
      link?: string;
      active?: boolean;
      layout?: string;
      thumbnail?: { fileName: string; url: string };
    }
  | { type: "UPDATE_TEXT"; id: string; text?: string; active?: boolean }
  | { type: "REORDER"; sourceIndex: number; destinationIndex: number }
  | { type: "FILL_CONTENT"; data: QrCode }
  | { type: "ADD_TEXT"; id: string }
  | { type: "UPDATE_PROFILE"; data: QrCode["ownerDetails"] };

type UpdatePageLinks = {
  id: string;
  title?: string;
  link?: string;
  active?: boolean;
  layout?: string;
  thumbnail?: { fileName: string; url: string };
};

type UpdatePageText = {
  id: string;
  text?: string;
  active?: boolean;
};

const boardStateReducer = (state: QrCode, action: ActionType): QrCode => {
  switch (action.type) {
    case "ADD_LINK":
      const newLink: PageLinks = {
        id: action.id,
        title: "",
        link: "",
        active: false,
        layout: "classic",
        thumbnail: {
          fileName: "",
          url: "",
        },
      };
      return { ...state, content: [...state?.content!, newLink] };
    case "ADD_TEXT":
      const newText: PageText = {
        id: action.id,
        text: "",
        active: false,
      };
      return { ...state, content: [...state?.content!, newText] };
    case "DELETE":
      return {
        ...state,
        content: state?.content?.filter((item) => item.id !== action.id)!,
      };
    case "UPDATE_LINK":
      return {
        ...state,
        content: state?.content?.map((item) =>
          "title" in item && item.id === action.id
            ? {
                ...item,
                title: action.title !== undefined ? action.title : item.title,
                link: action.link !== undefined ? action.link : item.link,
                active:
                  action.active !== undefined ? action.active : item.active,
                layout:
                  action.layout !== undefined ? action.layout : item.layout,
                thumbnail:
                  action.thumbnail !== undefined
                    ? action.thumbnail
                    : item.thumbnail,
              }
            : item
        )!,
      };
    case "UPDATE_TEXT":
      return {
        ...state,
        content: state?.content?.map((item) =>
          "text" in item && item.id === action.id
            ? {
                ...item,
                text: action.text !== undefined ? action.text : item.text,
                active:
                  action.active !== undefined ? action.active : item.active,
              }
            : item
        ),
      };
    case "UPDATE_PROFILE":
      console.log(action.data);
      return {
        ...state,
        ownerDetails: { ...state.ownerDetails, ...action.data },
      };
    case "REORDER":
      const content = Array.from(state?.content!);
      const [removed] = content.splice(action.sourceIndex, 1);
      content.splice(action.destinationIndex, 0, removed);
      return { ...state, content };
    case "FILL_CONTENT":
      return action.data;
    default:
      return state;
  }
};

export const BoardStateProvider = ({
  pageQr,
  children,
}: {
  children: ReactNode;
  pageQr: QrCode;
}) => {
  const [qrContent, dispatch] = useReducer(boardStateReducer, pageQr);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (pageQr) {
      isFirstRender.current = true;
      dispatch({ type: "FILL_CONTENT", data: pageQr });
    }
  }, [pageQr]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const handleStateChange = async () => {
      await updatedQrPageContent(pageQr.userid, qrContent?.content!);
    };

    handleStateChange();
  }, [qrContent?.content]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const handleStateChange = async () => {
      await updateQrPageProfile(pageQr.userid, qrContent?.ownerDetails!);
    };

    handleStateChange();
  }, [qrContent.ownerDetails]);

  const addContent = (type: "link" | "text") => {
    const id: string = genId();
    switch (type) {
      case "link":
        return dispatch({ type: "ADD_LINK", id });
      case "text":
        return dispatch({ type: "ADD_TEXT", id });
    }
  };

  const deleteContent = (id: string) => {
    dispatch({ type: "DELETE", id });
  };

  const updateLink = async (data: UpdatePageLinks) => {
    dispatch({ type: "UPDATE_LINK", ...data });
  };

  const updateText = (data: UpdatePageText) => {
    dispatch({ type: "UPDATE_TEXT", ...data });
  };

  const reorder = (sourceIndex: number, destinationIndex: number) => {
    dispatch({ type: "REORDER", sourceIndex, destinationIndex });
  };

  const updateOwner = (data: QrCode["ownerDetails"]) => {
    dispatch({ type: "UPDATE_PROFILE", data });
  };

  return (
    <BoardStateContext.Provider
      value={{
        qrContent,
        addContent,
        deleteContent,
        updateLink,
        updateText,
        reorder,
        updateOwner,
      }}
    >
      {children}
    </BoardStateContext.Provider>
  );
};

export const useBoardState = () => {
  const context = useContext(BoardStateContext);
  if (context === undefined) {
    throw new Error("useBoardState must be used within a BoardStateProvider");
  }
  return context;
};
