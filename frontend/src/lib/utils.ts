import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { ID_REGEX } from "@config/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIdFromUrl(url: string): string {
  const match = url.match(ID_REGEX);
  const id_size = 11; // YouTube ID sizes are 11 digits long.
  if (match && match[2].length == id_size) {
    return match[2];
  }
  return null;
}