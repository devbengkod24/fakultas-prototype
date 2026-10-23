import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitas standar penggabungan class Tailwind CSS secara kondisional
 * dan resolusi konflik class utility secara otomatis.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
