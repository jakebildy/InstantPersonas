import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import * as React from "react";
import Zod from "zod";

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

/**
 * Extracts a specific parameter from a URL using a regular expression.
 *
 * @param {string} url The URL to parse.
 * @param {string} parameterName The name of the parameter to extract.
 * @returns {string|null} The value of the parameter, or null if not found.
 *
 * This function simplifies the process of extracting parameters from URLs by using regular expressions.
 * It supports the intent of providing a method to retrieve specific data points (parameters)
 * from structured strings (URLs), which can be essential for configurations or processing dynamic web content.
 */
export function extractParameterFromURL(url: string, parameterName: string) {
  // Define the regular expression dynamically based on the parameter name
  const regex = new RegExp(`${parameterName}=([^&]*)`);

  if (!url) return null;
  // Perform the matching operation
  const match = url.match(regex);

  // Return the matched group or null if no match is found
  return match ? match[1] : null;
}

/**
 * Replaces the value of a specified parameter in a URL.
 *
 * This function simplifies the process of replacing parameter values in URLs by using regular expressions.
 * It supports modifying web content dynamically by altering URL parameters, essential for configurations
 * or adapting to user inputs.
 *
 * @returns {string} The modified URL with the new parameter value, or the original URL if the parameter was not found.
 */
export function replaceParameterInURL({
  url,
  parameter,
  value,
}: {
  url: string;
  parameter: string;
  value: string;
}): string {
  // Define the regular expression dynamically based on the parameter name
  const regex = new RegExp(`(${parameter}=)[^&]*`);

  // Check if the parameter exists; if not, return the original URL
  if (!url.match(regex)) return url;

  // Replace the existing parameter value with the new value
  return url.replace(regex, `$1${value}`);
}

/**
 * Converts a hex color string to an RGB array.
 */
export function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

/**
 * Calculates the Euclidean distance between two RGB colors.
 */
export function colorDistance(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  return Math.sqrt(
    (rgb1[0] - rgb2[0]) ** 2 +
      (rgb1[1] - rgb2[1]) ** 2 +
      (rgb1[2] - rgb2[2]) ** 2
  );
}

/**
 * Creates a 7-character random string
 */ export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

/**
 * Truncates the input text at the first occurrence of a period (.) or comma (,),
 * and limits the output to a maximum of 50 characters without cutting off any words.
 * Appends an ellipsis (...) if the length exceeds this limit.
 *
 * @param {string} text - The input text to be transformed.
 * @returns {string} The transformed text, truncated without cutting off words and possibly appended with ellipsis.
 *
 * @example
 * // returns 'Hello World...'
 * transformText("Hello World, this is a sample text that will be truncated.");
 *
 * @example
 * // returns 'Short text'
 * transformText("Short text");
 */
export function limitTextToFirstDelimiter(text: string): string {
  // Locate the first index of '.' or ','
  const index = Math.min(
    ...[".", ","].map((char) => text.indexOf(char)).filter((i) => i !== -1)
  );

  // Determine the segment of the text up to the found punctuation or full text if none
  let result = index > -1 ? text.substring(0, index) : text;

  // Append ellipsis without cutting off words if the text exceeds 50 characters
  if (result.length > 50) {
    const lastSpace = result.substring(0, 50).lastIndexOf(" ");
    result = result.substring(0, lastSpace) + "...";
  }

  return result;
}

/**
 * Flag indicating if the current environment is set to "dev" for test purposes.
 * @type {boolean}
 */
export const IS_TEST_DEV_ENV = process.env.NEXT_PUBLIC_ENV === "dev";

export type NumericRangeConfig = {
  ranges: ReadonlyArray<{
    min: number;
    max: number;
    label: string;
  }>;
};
// Use a conditional type to extract the label types from a given configuration.
type LabelForRangeConfig<Config extends NumericRangeConfig> =
  Config["ranges"][number]["label"];

/**
 * Function to map numeric values to corresponding labels based on provided configuration.
 * It remains generic and automatically infers the label types from the configuration passed.
 *
 * @param {number | null} value - The numeric value to classify.
 * @param {Config} config - Configuration defining labeled ranges.
 * @returns {LabelForRangeConfig<Config> | null} - The label associated with the matching range, or null if no range matches.
 */
export function labelForValueInRange<Config extends NumericRangeConfig>(
  value: number | null,
  config: Config
): LabelForRangeConfig<Config> | null {
  if (typeof value !== "number") {
    return null; // Handles non-number and null inputs by returning null
  }

  // Loop through the range definitions in the configuration to find a match
  for (const range of config.ranges) {
    if (value >= range.min && value < range.max) {
      return range.label as LabelForRangeConfig<Config>; // Type cast to maintain strict type safety
    }
  }

  return null; // Returns null if no range matches the value
}

/**
 * Replaces the provided answer with a specified placeholder value if the answer equals the default value.
 * If no answer is provided, the placeholder value is returned.
 *
 * @param {string} placeholder - The placeholder value to use if the answer is the default or absent.
 * @param {string | null} userResponse - The user's response, which may be null.
 * @param {string} defaultValue - The default value to check against the user's response.
 * @returns {string} - The user response or the placeholder if the response is the default or absent.
 */
export function replaceValueWithPlaceholderIfDefault({
  placeholder,
  value,
  defaultValue,
}: {
  placeholder: string;
  value: string | null;
  defaultValue: string;
}): string {
  // Return the placeholder if no response is provided or the response equals the default value,
  // otherwise return the response itself.
  return value ? (value === defaultValue ? placeholder : value) : placeholder;
}

export function extractKeysFromZodSchema(schema: Zod.ZodType): string[] {
  // Adjusted: Signature now uses Zod.ZodType to eliminate null& undefined check
  // check if schema is nullable or optional
  if (schema instanceof Zod.ZodNullable || schema instanceof Zod.ZodOptional) {
    return extractKeysFromZodSchema(schema.unwrap());
  }
  // check if schema is an array
  if (schema instanceof Zod.ZodArray) {
    return extractKeysFromZodSchema(schema.element);
  }
  // check if schema is an object
  if (schema instanceof Zod.ZodObject) {
    // get key/value pairs from schema
    const entries = Object.entries<Zod.ZodType>(schema.shape); // Adjusted: Uses Zod.ZodType as generic to remove instanceof check. Since .shape returns ZodRawShape which has Zod.ZodType as type for each key.
    // loop through key/value pairs
    return entries.flatMap(([key, value]) => {
      // get nested keys
      const nested = extractKeysFromZodSchema(value).map(
        (subKey) => `${key}.${subKey}`
      );
      // return nested keys
      return nested.length ? nested : key;
    });
  }
  // return empty array
  return [];
}
