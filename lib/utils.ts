import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelToTitleCase(str: string): string {
  // Add space before capital letters
  const spaced = str.replace(/([A-Z])/g, " $1");
  // Capitalize the first letter and trim any leading space
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).trim();
}

export function cartSummary(numItems: number) {
  if (numItems === 1) {
    return "(1 item)";
  } else {
    return `(${numItems} items)`;
  }
}
