export const url = "https://qrmee.vercel.app/"; //"http://192.168.1.3:3005/"
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
