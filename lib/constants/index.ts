export const url = "https://qrmee.vercel.app/"; // http://192.168.1.{replacewithnumber}:3005/
export const sidebarLinks = [
  {
    route: "/",
    label: "Links",
  },
  {
    route: "/",
    label: "Appearance",
  },
  {
    route: "/",
    label: "Privacy",
  },
  {
    route: "/",
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
