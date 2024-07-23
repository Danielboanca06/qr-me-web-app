import { cva } from "class-variance-authority";

export const url = "https://qrmee.vercel.app/"; //"http://192.168.1.3:3005/" //"https://qrmee.vercel.app/"
export const supportEmail = "";
export const sidebarLinks = [
  {
    route: "/",
    label: "Links",
  },
  {
    route: "/appearance",
    label: "Appearance",
  },
  {
    route: "/privacy",
    label: "Privacy",
  },
  {
    route: "/settings",
    label: "Settings",
  },
];
export type LinkOptionType =
  | "layout"
  | "thumbnail"
  // | "lock"
  | "qrCode"
  | "clicks";
export const LinkOptions: LinkOptionType[] = [
  "layout",
  "thumbnail",
  // "lock",
  "qrCode",
  "clicks",
];

export const buttonBoardVariants = {
  Fill: "bg-black-100",
  Outline: "border-[1.5px] border-black-100",
  "Soft Shadow": "shadow-3xl",
  "Hard Shadow": "border-[1.5px] border-black-100 shadow-block",
};
