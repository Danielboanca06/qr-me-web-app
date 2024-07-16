import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { string, z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const passwordSchema = z
  .string()
  .min(8)
  .refine(
    (value) => {
      return (
        /[A-Z]/.test(value) && // at least one uppercase letter
        /[0-9]/.test(value) // at least one numeric character
      );
    },
    {
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, and one numeric character.",
    }
  );

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName: type === "sign-up" ? z.string().min(1) : z.string().optional(),
    lastName: type === "sign-up" ? z.string().min(1) : z.string().optional(),
    username: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    shoppingPreference:
      type === "shippingDetails"
        ? z.enum(["Men's", "Women's"])
        : z.enum(["Men's", "Women's"]).optional(),
    address:
      type === "shippingDetails" ? z.string().max(50) : z.string().optional(),
    postalCode:
      type === "shippingDetails"
        ? z.string().min(3).max(6)
        : z.string().optional(),
    dateOfBirth:
      type === "shippingDetails" ? z.string().min(3) : z.string().optional(),
    phoneNumber:
      type === "shippingDetails"
        ? z.string().min(9).optional()
        : z.string().optional(),
    // both
    email: type === "email" ? z.string().email().trim() : z.string().optional(),
    password: type === "email" ? z.string().optional() : passwordSchema,
  });

type VerifyEmailTokenResult = {
  email: string;
  error: boolean;
};

export const validLinkSchema = z.object({
  url: z.union([
    z.string().url({ message: "Please enter a valid URL" }),
    z.string().length(0),
  ]),
});

export const charNumSchema = (field: string, maxLength: number) => {
  return z.object({
    [field]: z
      .string()
      .max(maxLength, `${field} must be at most ${maxLength} characters long`),
  });
};

export const genId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const verifyEmailToken = (): VerifyEmailTokenResult => {
  "use client";
  let email = "";
  let error = false;

  if (typeof window === "undefined") {
    // Ensure this code only runs on the client
    console.error("This function should be called in a client environment.");
    error = true;
    return { email, error };
  }

  const storedData = localStorage.getItem("emailAuth");

  if (storedData) {
    email = storedData;
  } else {
    error = true;
  }

  return {
    email,

    error,
  };
};

export function downloadImage(
  dataUrl: string,
  name: string,
  format: "png" | "svg"
) {
  // Ensure the file name has the correct extension
  const extension = format === "svg" ? ".svg" : ".png";
  if (!name.toLowerCase().endsWith(extension)) {
    name += extension;
  }

  // Check if the format is SVG
  if (format === "svg") {
    // Convert PNG data URL to SVG data URL
    const svgData = `
     <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
       <image href="${dataUrl}" x="0" y="0" width="200" height="200"/>
     </svg>`;
    const svgDataUrl =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);

    // Create a link element and trigger download for SVG
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = svgDataUrl;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    // Convert data URL to Blob for PNG
    const byteString = atob(dataUrl.split(",")[1]);
    const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    // Create a link element and trigger download for PNG
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Release the object URL to free up memory
    window.URL.revokeObjectURL(url);
  }

  return Promise.resolve();
}

export const copyClick = async (textToCopy: string): Promise<boolean> => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
    return true;
  }
  return false;
};

export const resizeImage = async (file: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    // Extract base64 data from the input string
    const matches = file.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      reject(new Error("Invalid base64 image data"));
      return;
    }
    const base64Data = matches[2];

    // Create HTMLImageElement to load the image
    const img = new Image();
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image onto canvas
      ctx?.drawImage(img, 0, 0, img.width, img.height);

      // Resize the image on the canvas
      const maxWidth = 300;
      const maxHeight = 300;
      let newWidth = img.width;
      let newHeight = img.height;

      if (newWidth > maxWidth) {
        const ratio = maxWidth / newWidth;
        newWidth *= ratio;
        newHeight *= ratio;
      }

      if (newHeight > maxHeight) {
        const ratio = maxHeight / newHeight;
        newWidth *= ratio;
        newHeight *= ratio;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      // Convert canvas to base64 data URL
      const resizedBase64 = canvas.toDataURL(`image/${matches[1]}`);

      // Resolve with the resized image data URL
      resolve(resizedBase64);
    };

    // Set the image source to trigger loading
    img.src = `data:image/${matches[1]};base64,${base64Data}`;
  });
};

const colours = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  "indianred ": "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370d8",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#d87093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
} as const;

type ColourName = keyof typeof colours;

export const colourNameToHex = (colour: string) => {
  if (colours[colour.toLowerCase() as ColourName]) {
    return colours[colour.toLowerCase() as ColourName];
  }

  return false;
};

export const hexToRgba = (hex: string, alpha = 1) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA color
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
