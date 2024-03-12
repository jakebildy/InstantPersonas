import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";

/**
 * compose tailwind classnames
 */ export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * debounce function
 */ export function debounce(
  this: any,
  func: (this: any, ...args: any[]) => void,
  timeout: number = 200
): (...args: any[]) => void {
  let timer: NodeJS.Timeout | null = null;
  return function (this: any, ...args: any[]): void {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

/**
 * A Utility function to generate timestamps
 */ export function generateTimestamp(): string {
  return new Date().toISOString();
}

// Compose Ref Functions from Radix UI

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === "function") {
    // For callback refs
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    // For RefObject(s)
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ export function composeRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T) => void {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ export function useComposedRefs<T>(
  ...refs: PossibleRef<T>[]
): (node: T) => void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(composeRefs(...refs), refs);
}

/**
 * Converts a Unix timestamp (in seconds) to a relative time string.
 *
 * @param {number} unixTimestamp - The Unix timestamp in seconds.
 * @returns {string} Relative time description.
 */
export function unixTimeAgo(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  return timeAgo(date);
}

/**
 * Generates a relative time string (e.g., "2 minutes ago") from the given date.
 * The output scales from seconds to decades based on the time difference from the current time.
 * Optionally, custom intervals can be provided to define different time scales.
 *
 * @param {Date} date - The past date to compare against the current time.
 * @param {Array<{threshold: number, unit: string}>} [customIntervals] - Optional. Custom time intervals for scaling.
 * @returns {string} Relative time description.
 */
export function timeAgo(
  date: Date,
  customIntervals?: Array<{ threshold: number; unit: string }>
): string {
  const currentTime = new Date();
  const differenceInSeconds = (currentTime.getTime() - date.getTime()) / 1000;

  // Return "just now" for times less than a second ago
  if (differenceInSeconds < 1) {
    return "just now";
  }

  const SECOND = 1;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY; // Approximation
  const YEAR = 365.25 * DAY; // Accounts for leap years
  const DECADE = 10 * YEAR;

  const defaultIntervals = [
    { threshold: DECADE, unit: "decade" },
    { threshold: YEAR, unit: "year" },
    { threshold: MONTH, unit: "month" },
    { threshold: DAY, unit: "day" },
    { threshold: HOUR, unit: "hour" },
    { threshold: MINUTE, unit: "minute" },
    { threshold: SECOND, unit: "second" },
  ];

  // Use customIntervals if provided, else use defaultIntervals
  const intervals = customIntervals || defaultIntervals;

  for (const { threshold, unit } of intervals) {
    if (differenceInSeconds >= threshold) {
      const count = Math.floor(differenceInSeconds / threshold);
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }

  // This catch-all return statement is a failsafe and should never be reached
  return "just now";
}

/**
 * A utility to delay a function call by a given amount of milliseconds.
 */ export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param str - The string to be capitalized.
 * @returns The string with the first letter capitalized. If the input string is empty,
 *          it returns the original string.
 */ export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates a string to a specified length, appending an ellipsis if necessary.
 *
 * @param {string | undefined} str - The string to be truncated.
 * @param {number} n - The maximum length of the truncated string.
 * @returns {string} - The truncated string, with an ellipsis if it exceeds the specified length.
 */ export function truncate(str: string | undefined, n: number): string {
  // Return an empty string if the input is undefined
  if (!str) return "";

  // Truncate the string and append an ellipsis if its length exceeds 'n'
  return str.length > n ? str.substring(0, n - 1).trim() + "..." : str;
}
