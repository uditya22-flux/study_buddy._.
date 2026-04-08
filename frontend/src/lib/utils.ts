import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colorMap: Record<string, string> = {
  blue: "#3b82f6",
  purple: "#8b5cf6",
  green: "#10b981",
  amber: "#f59e0b",
  coral: "#ef4444",
  teal: "#14b8a6",
  pink: "#ec4899",
  orange: "#f97316",
};
