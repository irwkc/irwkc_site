import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Safari / iOS WebKit (incl. Chrome on iOS). */
export function isSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const webkit = /AppleWebKit/i.test(ua);
  const chrome = /Chrome|CriOS|Chromium|Edg|OPR|Firefox|FxiOS/i.test(ua);
  const iOS = /iPhone|iPad|iPod/i.test(ua);
  return (webkit && !chrome) || (iOS && webkit);
}
