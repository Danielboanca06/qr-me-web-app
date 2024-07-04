import { updatedQrPageContent } from "lib/actions/qr-code";
import { genId } from "lib/utils";
import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useMemo,
} from "react";

interface PageLinks {
  id: string;
  title: string;
  link: string;
  active: boolean;
  layout: string;
  thumbnail: string;
}

interface PageText {
  id: string;
  text: string;
  active: boolean;
}

interface BoardStateContextProps {
  content: Array<PageLinks | PageText>;
  qrData: QrCode;
  addContent: (type: "link" | "text") => void;
  deleteContent: (id: string) => void;
  updateLink: (data: UpdatePageLinks) => void;
  updateText: (data: UpdatePageText) => void;
  reorder: (sourceIndex: number, destinationIndex: number) => void;
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
      thumbnail?: string;
    }
  | { type: "UPDATE_TEXT"; id: string; text?: string; active?: boolean }
  | { type: "REORDER"; sourceIndex: number; destinationIndex: number }
  | { type: "FILL_CONTENT"; data: Array<PageLinks | PageText> }
  | { type: "ADD_TEXT"; id: string };

type UpdatePageLinks = {
  id: string;
  title?: string;
  link?: string;
  active?: boolean;
  layout?: string;
  thumbnail?: string;
};

type UpdatePageText = {
  id: string;
  text?: string;
  active?: boolean;
};

const boardStateReducer = (
  state: BoardStateContextProps["content"],
  action: ActionType
): Array<PageLinks | PageText> => {
  switch (action.type) {
    case "ADD_LINK":
      const newLink: PageLinks = {
        id: action.id,
        title: "",
        link: "",
        active: false,
        layout: "classic",
        thumbnail: "",
      };
      return [...state, newLink];
    case "ADD_TEXT":
      const newText: PageText = {
        id: action.id,
        text: "",
        active: false,
      };
      return [...state, newText];

    case "DELETE":
      return state.filter((item) => item.id !== action.id);
    case "UPDATE_LINK":
      return state.map((item) => {
        if ("title" in item && item.id === action.id) {
          return {
            ...item,
            title: action.title !== undefined ? action.title : item.title,
            link: action.link !== undefined ? action.link : item.link,
            active: action.active !== undefined ? action.active : item.active,
            layout: action.layout !== undefined ? action.layout : item.layout,
            thumbnail:
              action.thumbnail !== undefined
                ? action.thumbnail
                : item.thumbnail,
          };
        }
        return item;
      });
    case "UPDATE_TEXT":
      return state.map((item) => {
        if ("text" in item && item.id === action.id) {
          return {
            ...item,
            text: action.text !== undefined ? action.text : item.text,
            active: action.active !== undefined ? action.active : item.active,
          };
        }
        return item;
      });
    case "REORDER":
      const { sourceIndex, destinationIndex } = action;
      const content = Array.from(state);
      const [removed] = content.splice(sourceIndex, 1);
      content.splice(destinationIndex, 0, removed);
      return content;
    case "FILL_CONTENT":
      return action.data;
    default:
      return state;
  }
};

export const BoardStateProvider = ({
  username,
  initalState,
  children,
  pageQr,
}: {
  username: string;
  initalState?: Array<PageLinks | PageText>;
  children: ReactNode;
  pageQr: QrCode;
}) => {
  const [content, dispatch] = useReducer(boardStateReducer, []);
  const qrData = useMemo(() => {
    return pageQr;
  }, [pageQr]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (initalState) {
      dispatch({ type: "FILL_CONTENT", data: initalState || [] });
    }
  }, [initalState]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const handleStateChange = async () => {
      await updatedQrPageContent(username, content);
    };

    handleStateChange();
  }, [content]);

  const addContent = (type: "link" | "text") => {
    switch (type) {
      case "link":
        return dispatch({ type: "ADD_LINK", id: genId });
      case "text":
        return dispatch({ type: "ADD_TEXT", id: genId });
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

  return (
    <BoardStateContext.Provider
      value={{
        content,
        qrData,
        addContent,
        deleteContent,
        updateLink,
        updateText,
        reorder,
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
