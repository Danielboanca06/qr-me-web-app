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
