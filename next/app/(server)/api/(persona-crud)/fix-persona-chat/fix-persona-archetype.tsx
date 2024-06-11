import { extractKeysFromZodSchema, similarityScore } from "@/lib/utils";
import {
  PersonaArchetype,
  PersonaArchetypeValidator,
  PersonaArchetypeValidatorWithDefaults,
} from "../persona-ai.model";

const personaArchetypeParams = extractKeysFromZodSchema(
  PersonaArchetypeValidator,
).map((prop) => prop.split("."));

export function fixPersonaArchetype(persona: any): PersonaArchetype | null {
  const safeParse = PersonaArchetypeValidator.strict().safeParse(persona);

  if (safeParse.success) {
    return safeParse.data;
  }

  const attemptedReconstructPersona: {
    [key: string]: any;
  } = {};

  Object.entries(persona).map(([key, value]): void => {
    const data = reconstructKeyFromData({
      key,
      data: value,
      schemaKeys: personaArchetypeParams,
    });

    if (data) {
      Object.entries(data).map(([key, value]) => {
        attemptedReconstructPersona[key] = value;
      });
    }
  });

  // return attemptedReconstructPersona as PersonaArchetype;

  const safeParseReconstruct = PersonaArchetypeValidatorWithDefaults.safeParse(
    attemptedReconstructPersona,
  );

  return safeParseReconstruct.success ? safeParseReconstruct.data : null;
}

/**
 * Reduce the matched parameters to find the one with the highest similarity score.
 * @param acc - The accumulator object holding the best match so far.
 * @param obj - The current object being processed.
 * @returns The object with the highest similarity score.
 */
function findHighestKeySimilarityScore(
  acc: { key: string; similarity: number } | undefined,
  obj: { key: string; similarity: number } | undefined,
): { key: string; similarity: number } | undefined {
  if (!acc) return obj; // If acc is undefined, return obj
  if (!obj) return acc; // If obj is undefined, continue with acc
  return obj.similarity > acc.similarity ? obj : acc; // Compare if both are not undefined
}

/**
 * Find the parameter that best matches the given key.
 * @param key - The key to match against the parameters.
 * @param params - The array of parameters to compare.
 * @returns The best matching parameter with its similarity score.
 */
function findMatchedParamKey(
  key: string,
  params: string[],
): { key: string; similarity: number } | undefined {
  let bestMatch: { key: string; similarity: number } | undefined = undefined;

  for (const param of params) {
    const score = similarityScore(key, param);

    if (score > 0.95) {
      return { key: param, similarity: score }; // Early exit if a high similarity is found
    }
    if (score > 0.8) {
      const match = { key: param, similarity: score };
      bestMatch = findHighestKeySimilarityScore(bestMatch, match);
    }
  }

  return bestMatch;
}

/**
 * Recursively crawls an object, comparing keys to valid keys and selecting the most similar or dropping the key.
 * If the parent key is badly spelled, it uses the ratio of matched child keys to find the best match.
 * @param {string} key - The key to be validated and reconstructed.
 * @param {any} data - The data associated with the key, which may be a nested object.
 * @param {string[][]} schemaKeys - The array of valid keys from the schema.
 * @returns {any} - The reconstructed data object with valid keys or null if no valid key is found.
 */
function reconstructKeyFromData({
  key,
  data,
  schemaKeys,
}: {
  key: string;
  data: any;
  schemaKeys: string[][];
}): any {
  // Flatten the schemaKeys to get a unique list of valid keys
  const flatSchemaKeys = [...new Set(schemaKeys.flat())];

  // Find the most similar key from the valid keys list
  const matchedKey: {
    key: string | undefined;
    similarity: number;
  } = findMatchedParamKey(key, flatSchemaKeys) || {
    key: undefined,
    similarity: 0,
  };

  let reconstructedData: any = null;

  // If data is an object, recursively reconstruct the object
  if (typeof data === "object" && data !== null) {
    const reconstructedObject: { [key: string]: any } = {};
    const matchedChildKeys: string[] = [];
    let totalChildKeys = 0;

    Object.entries(data).forEach(([subKey, subValue]) => {
      totalChildKeys++;
      // Recursively reconstruct each key-value pair in the object
      const reconstructedSubValue = reconstructKeyFromData({
        key: subKey,
        data: subValue,
        schemaKeys,
      });

      // Only add the reconstructed key-value pair if a valid key is found
      if (reconstructedSubValue) {
        Object.assign(reconstructedObject, reconstructedSubValue);
        matchedChildKeys.push(subKey);
      }
    });

    // Attempt to find a valid parent key based on the majority of valid child keys
    if (
      matchedKey.key === undefined &&
      matchedChildKeys.length / totalChildKeys > 0.5
    ) {
      const inferedKeyFromChildData = inferKeyFromData({
        data: matchedChildKeys,
        schemaKeys,
      });

      if (inferedKeyFromChildData) {
        reconstructedData = data;
        matchedKey.key = inferedKeyFromChildData;
      }
    } else {
      reconstructedData = data;
    }
  } else {
    // If data is not an object, simply assign it to the reconstructedData
    reconstructedData = data;
  }

  // Return the reconstructed data with the matched key or null if no key is found
  return matchedKey.key ? { [matchedKey.key]: reconstructedData } : null;
}

/**
 * Infer the parent key from given child keys and schema keys.
 *
 * @param {object} params - The function parameters.
 * @param {string[]} params.data - The array of child keys.
 * @param {SchemaKeys} params.schemaKeys - The schema keys array.
 * @param {number} params.threshold - The ratio threshold for inferring the parent key.
 * @returns {string | null} - The inferred parent key or null if no match is found.
 */
const inferKeyFromData = ({
  data,
  schemaKeys,
  threshold = 0.5,
}: {
  data: string[];
  schemaKeys: string[][];
  threshold?: number;
}): string | null => {
  const keyPathMatchMap = schemaKeys
    .map((path) => {
      const matchIndex = path.findIndex((key) => data.includes(key)); // Find the index of the first matching key
      if (matchIndex !== -1) {
        const prev = path.slice(0, matchIndex).join("."); // Join the path up to (but not including) the match
        const match = path[matchIndex]; // The matching key
        return { prev, match }; // Return the object with 'prev' and 'match'
      }
      return null;
    })
    .filter(
      (
        item,
      ): item is {
        prev: string; // The concatenated keys before the matching key
        match: string; // The matching key
      } => item !== null,
    )
    .reduce(
      (acc, item) => {
        if (!acc[item.prev]) {
          acc[item.prev] = []; // Initialize the array if it does not exist
        }
        acc[item.prev].push(item.match); // Push the match into the array
        return acc;
      },
      {} as { [key: string]: string[] },
    );

  const likelyParentKey = Object.entries(keyPathMatchMap)
    .map(([key, value]) => {
      const parentKey = key.split(".")[0];

      // Needs to compare ordered array `keyPath` to ordered array + n elements `schemaKeys[i]`

      const allChildKeysOfParent = schemaKeys.filter((path) =>
        path.join(".").startsWith(key),
      );
      // We only care about matched keys in `value` since other keys will be dropped by the zod schema.
      const similarityScore = value.length / allChildKeysOfParent.length;

      return { key: parentKey, similarity: similarityScore };
    })
    .reduce(findHighestKeySimilarityScore, undefined);

  if (!likelyParentKey || likelyParentKey.similarity < threshold) {
    return null;
  } else {
    return likelyParentKey.key;
  }
};
