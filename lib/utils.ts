import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName:
      type === "shippingDetails" || type === "sign-up"
        ? z.string().min(3)
        : z.string().optional(),
    lastName:
      type === "shippingDetails" || type === "sign-up"
        ? z.string().min(3)
        : z.string().optional(),
    shoppingPreferance:
      type === "shippingDetails" || type === "sign-up"
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
    email: type === "sign-up" ? z.string().optional() : z.string().email(),
    password: type === "email" ? z.string().optional() : z.string().min(8),
  });
