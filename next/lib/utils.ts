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
  timeout: number = 200,
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
  customIntervals?: Array<{ threshold: number; unit: string }>,
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
  rgb2: [number, number, number],
): number {
  return Math.sqrt(
    (rgb1[0] - rgb2[0]) ** 2 +
      (rgb1[1] - rgb2[1]) ** 2 +
      (rgb1[2] - rgb2[2]) ** 2,
  );
}

/**
 * Creates a 7-character random string
 */ export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
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
    ...[".", ","].map((char) => text.indexOf(char)).filter((i) => i !== -1),
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
  config: Config,
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

/**
 * Extracts all keys from a Zod schema, handling nested schemas.
 *
 * @param {Zod.ZodType} zodSchema - The Zod schema to extract keys from.
 * @returns {string[]} An array of strings representing the keys in the schema.
 */
export function extractKeysFromZodSchema(zodSchema: Zod.ZodType): string[] {
  // If the schema is nullable or optional, unwrap it and recurse.
  if (
    zodSchema instanceof Zod.ZodNullable ||
    zodSchema instanceof Zod.ZodOptional
  ) {
    return extractKeysFromZodSchema(zodSchema.unwrap());
  }

  // If the schema is an array, recurse into the element type.
  if (zodSchema instanceof Zod.ZodArray) {
    return extractKeysFromZodSchema(zodSchema.element);
  }

  // If the schema is an object, process its shape.
  if (zodSchema instanceof Zod.ZodObject) {
    // Retrieve key/value pairs from the schema shape.
    const entries = Object.entries<Zod.ZodType>(zodSchema.shape);

    // Process each key/value pair.
    return entries.flatMap(([key, value]) => {
      // Extract nested keys, prefixing them with the parent key.
      const nestedKeys = extractKeysFromZodSchema(value).map(
        (nestedKey) => `${key}.${nestedKey}`,
      );

      // If there are nested keys, return them; otherwise, return the key itself.
      return nestedKeys.length ? nestedKeys : key;
    });
  }

  // If the schema is not an object, array, or nullable/optional, return an empty array.
  return [];
}

/**
 * Calculates the Levenshtein distance between two strings.
 * @param string - First string.
 * @param target - Second string.
 * @returns The Levenshtein distance between the two strings.
 *
 * The implementation of the Levenshtein distance algorithm is based on the following source: https://github.com/gustf
 */
export function levenshtein(string: string, target: string): number {
  if (string === target) {
    return 0;
  }
  var n = string.length,
    m = target.length;
  if (n === 0 || m === 0) {
    return n + m;
  }
  var x = 0,
    y,
    a,
    b,
    c,
    d,
    g,
    h;
  var p = new Uint16Array(n);
  var u = new Uint32Array(n);
  for (y = 0; y < n; ) {
    u[y] = string.charCodeAt(y);
    p[y] = ++y;
  }

  for (; x + 3 < m; x += 4) {
    var e1 = target.charCodeAt(x);
    var e2 = target.charCodeAt(x + 1);
    var e3 = target.charCodeAt(x + 2);
    var e4 = target.charCodeAt(x + 3);
    c = x;
    b = x + 1;
    d = x + 2;
    g = x + 3;
    h = x + 4;
    for (y = 0; y < n; y++) {
      a = p[y];
      if (a < c || b < c) {
        c = a > b ? b + 1 : a + 1;
      } else {
        if (e1 !== u[y]) {
          c++;
        }
      }

      if (c < b || d < b) {
        b = c > d ? d + 1 : c + 1;
      } else {
        if (e2 !== u[y]) {
          b++;
        }
      }

      if (b < d || g < d) {
        d = b > g ? g + 1 : b + 1;
      } else {
        if (e3 !== u[y]) {
          d++;
        }
      }

      if (d < g || h < g) {
        g = d > h ? h + 1 : d + 1;
      } else {
        if (e4 !== u[y]) {
          g++;
        }
      }
      p[y] = h = g;
      g = d;
      d = b;
      b = c;
      c = a;
    }
  }

  for (; x < m; ) {
    var e = target.charCodeAt(x);
    c = x;
    d = ++x;
    for (y = 0; y < n; y++) {
      a = p[y];
      if (a < c || d < c) {
        d = a > d ? d + 1 : a + 1;
      } else {
        if (e !== u[y]) {
          d = c + 1;
        } else {
          d = c;
        }
      }
      p[y] = d;
      c = a;
    }
    h = d;
  }

  return h || 0;
}

/**
 * Calculates the similarity score between two strings based on the Levenshtein distance.
 * @param target - The target word.
 * @param word - The word to compare.
 * @returns A similarity score between 0 and 1, where 1 means identical and 0 means completely different.
 */
export function similarityScore(target: string, word: string): number {
  const distance = levenshtein(target, word);
  const maxLength = Math.max(target.length, word.length);
  return 1 - distance / maxLength;
}

/**
 * Returns a random key from the provided object.
 *
 * @typeParam T - The type of the object.
 * @param obj - The object from which to select a random key.
 * @returns A random key from the object.
 *
 * @example
 * const myObject = { a: 1, b: 2, c: 3 };
 * const randomKey = getRandomKey(myObject);
 * console.log(randomKey); // could log 'a', 'b', or 'c'
 */
export function getRandomKey<T extends Record<string, any>>(obj: T): keyof T {
  // Get all keys of the object
  const keys = Object.keys(obj) as (keyof T)[];

  // Generate a random index based on the number of keys
  const randomIndex = Math.floor(Math.random() * keys.length);

  // Return the key at the random index
  return keys[randomIndex];
}

export const isValidUrl = (url: string): boolean => {
  const urlRegex = /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
  return !!urlRegex.test(url);
};
