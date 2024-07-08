import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { z } from "zod";

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
