import { fixJson } from "@/lib/fix-json";
import SecureJSON from "secure-json-parse";
import {
  ClientMessage,
  Message,
  PersonaArchetype,
} from "@/app/(server)/models/persona-ai.model";
import { colorDistance, extractParameterFromURL, hexToRgb } from "@/lib/utils";
import { isEqual } from "lodash";
import { ColorVariant, ColorVariantMap } from "@/components/variants";
import { getUIStateFromAIState } from "@/app/(server)/ai/persona-chat-ai/utils/get-ui-state-from-ai-state";
import { fixPersonaChatMessageHistoryModel } from "@/app/(server)/api/(persona-crud)/fix-persona-chat/fix-messages";

/**pnpm
 * Transforms and merges structured and unstructured data objects into a single object.
 * This function acts as a coordinator that calls specific functions to handle merging operations
 * and to collect any remaining unstructured data.
 *
 * @param {Object} params - An object containing structured and unstructured data.
 * @param {Record<string, any>} params.structuredData - The structured data as key-value pairs.
 * @param {Record<string, any>} params.unstructuredData - The unstructured data as key-value pairs.
 * @returns {Record<string, any>} The transformed and merged data as a single object.
 */
export function transformDataToStructure({
  structuredData,
  unstructuredData,
}: {
  structuredData: Record<string, any>;
  unstructuredData: Record<string, any>;
}): Record<string, any> {
  const transformed = mergeStructuredData(structuredData, unstructuredData);
  const remainingUnstructuredData = collectRemainingData(unstructuredData);

  return { ...transformed, ...remainingUnstructuredData };
}

/**
 * Merges structured data with relevant data from an unstructured data source.
 * Iterates through each key in the structured data and decides if further nesting is necessary.
 *
 * @param {Record<string, any>} structured - Structured data to merge.
 * @param {Record<string, any>} unstructured - Unstructured data to be merged.
 * @returns {Record<string, any>} Merged data based on structured keys.
 */
function mergeStructuredData(
  structured: Record<string, any>,
  unstructured: Record<string, any>,
) {
  const result: Record<string, any> = { ...structured }; // Clone to preserve original structured data

  Object.keys(structured).forEach((key) => {
    const value = structured[key];
    if (isObject(value)) {
      // Instead of creating an empty object, clone the existing structured data
      result[key] = mergeNestedData({ ...value }, unstructured);
    } else {
      assignDataIfPresent(result, key, unstructured);
    }
  });

  return result;
}
/**
 * Handles the merging of nested structured data.
 * Assigns data from unstructured to structured where relevant keys match.
 *
 * @param {Record<string, any>} nestedData - The nested structured data.
 * @param {Record<string, any>} unstructured - The unstructured data source.
 * @returns {Record<string, any>} Merged nested data.
 */
function mergeNestedData(
  nestedData: Record<string, any>,
  unstructured: Record<string, any>,
) {
  const nestedResult = { ...nestedData }; // Start with a copy of nested data

  Object.keys(nestedData).forEach((subKey) => {
    assignDataIfPresent(nestedResult, subKey, unstructured);
  });

  return nestedResult;
}
/**
 * Assigns data from the source to the target object if the key is present in the source.
 * Also removes the key from the source after assignment to avoid duplication.
 *
 * @param {Record<string, any>} target - The target object where data should be assigned.
 * @param {string} key - The key to check in the source.
 * @param {Record<string, any>} source - The source object from which to assign the data.
 */
function assignDataIfPresent(
  target: Record<string, any>,
  key: string,
  source: Record<string, any>,
) {
  // Ensure the key exists and the value is not undefined in the source before assigning
  if (source.hasOwnProperty(key) && source[key] !== undefined) {
    target[key] = source[key];
    delete source[key];
  }
}

/**
 * Collects all remaining data in the unstructured data source after the main merging process.
 *
 * @param {Record<string, any>} unstructured - The remaining unstructured data.
 * @returns {Record<string, any>} The remaining unstructured data collected as an object.
 */
function collectRemainingData(
  unstructured: Record<string, any>,
): Record<string, any> {
  const additionalProperties: Record<string, any> = {};

  Object.keys(unstructured).forEach((key) => {
    additionalProperties[key] = unstructured[key];
  });

  return additionalProperties;
}

/**
 * Utility function to determine if a variable is an object and not an array.
 *
 * @param {any} value - The variable to check.
 * @returns {boolean} True if the variable is an object and not an array, false otherwise.
 */
function isObject(value: any): boolean {
  return typeof value === "object" && !Array.isArray(value);
}

export function updatePersonaByName({
  personas,
  oldPersona,
  updatedArchetype,
}: {
  personas: PersonaArchetype[];
  oldPersona: PersonaArchetype;
  updatedArchetype: PersonaArchetype;
}): PersonaArchetype[] {
  return personas.map((persona) => {
    if (isEqual(persona, oldPersona)) {
      return { ...persona, ...updatedArchetype };
    }
    return persona;
  });
}

type SynchronizeStates = {
  aiState: {};
  uiState: ClientMessage[];
};

export function getSynchronizeStates({
  aiState,
  serializedPersonas,
}: {
  aiState: any;
  serializedPersonas: string;
}): SynchronizeStates {
  const personas = JSON.parse(serializedPersonas);
  const { messages } = fixPersonaChatMessageHistoryModel({
    messages: aiState.messages,
    fixedPersonas: personas,
  });

  const newAiState = {
    ...aiState,
    messages,
    personas: personas, // Assuming personas should be updated as array objects
  };

  return {
    aiState: newAiState,
    uiState: getUIStateFromAIState(newAiState) as ClientMessage[],
  };
}

/**
 * Attempts to parse a JSON string, handling cases where the string may be partially malformed.
 * The function first tries a standard JSON parse. If that fails, it attempts to repair the partial
 * JSON string and parse again. If all parsing attempts fail, it logs an error and returns undefined.
 *
 * @param {string | undefined} jsonText - The JSON string to parse, which can be undefined.
 * @returns {unknown | undefined} - The parsed JSON object, or undefined if parsing fails.
 */
export function tryParseJsonWithRepair(
  jsonText: string | undefined,
): unknown | undefined {
  if (jsonText == null) {
    return undefined;
  }

  try {
    // Attempt a standard JSON parse:
    return SecureJSON.parse(jsonText);
  } catch (ignored) {
    // If standard parsing fails, attempt to repair and parse the partial JSON:
    try {
      const fixedJsonText = fixJson(jsonText);
      return SecureJSON.parse(fixedJsonText);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  return undefined;
}

export function serializePersonas(personas: PersonaArchetype[]): string | null {
  try {
    return JSON.stringify(personas);
  } catch (error) {
    console.error("Error serializing personas:", error);
    return null;
  }
}

/**
 * Finds the closest color variant based on a hex color.
 */
export function findClosestColorVariant(hexColor: string): ColorVariant {
  const colorRgb = hexToRgb(hexColor);
  let closestColor: ColorVariant = "blue";
  let smallestDistance = Number.MAX_VALUE;

  for (const variant in ColorVariantMap) {
    const variantRgb = hexToRgb(ColorVariantMap[variant as ColorVariant]);
    const distance = colorDistance(colorRgb, variantRgb);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestColor = variant as ColorVariant;
    }
  }

  return closestColor;
}

/**
 * Maps a URL background color parameter to a color variant.
 */
export function mapUrlBackgroundColorParamToVariant({
  url,
  param = "backgroundColor",
}: {
  url: string;
  param?: string;
}): ColorVariant {
  const color = extractParameterFromURL(url, param);
  const hex = "#" + color;
  if (color && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) {
    return findClosestColorVariant(hex);
  }

  // If color is not valid hex, return a default color
  return "blue"; // Assuming blue is the default; adjust as necessary
}
