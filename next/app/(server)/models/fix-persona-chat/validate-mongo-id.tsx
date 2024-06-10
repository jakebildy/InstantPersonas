import ObjectID from "bson-objectid";
import { z } from "zod";

/**
 * Validator for MongoID represented as a string.
 * Ensures the string is a valid MongoID.
 */
const MongoIDAsString = z.string().refine(
  (val) => {
    return ObjectID.isValid(val);
  },
  {
    message: "Invalid MongoID string",
  },
);

/**
 * Validator for MongoID represented as an object.
 * Ensures the object is not undefined or null and has a valid toString method.
 */
const MongoIDAsObject = z
  .custom<ObjectID>()
  .refine(
    (val) => {
      return val !== undefined && val !== null;
    },
    {
      message: "MongoID cannot be undefined or null",
    },
  )
  .transform((data) => {
    // Throw an error if data is undefined or null
    if (data === undefined || data === null) {
      throw new Error("MongoID cannot be undefined or null", data);
    }
    // Convert object to string if it has a toString method, else return as is
    if (typeof data === "object" && typeof data.toString === "function") {
      return data.toString();
    }
    return data;
  })
  .refine(
    (val) => {
      return ObjectID.isValid(val);
    },
    {
      message: "Invalid MongoID string",
    },
  );

/**
 * Combined validator for MongoID.
 * Supports both string and object representations of MongoID.
 */
export const MongoIDValidator = z.union([MongoIDAsString, MongoIDAsObject]);

/**
 * Utility function to check if a given string is a valid MongoID.
 * @param val - The string to check.
 * @returns True if the string is a valid MongoID, otherwise false.
 */
export const stringIsMongoID = (val: string): boolean => {
  return ObjectID.isValid(val);
};

/**
 * Type representing a valid MongoID.
 */
export type MongoID = z.infer<typeof MongoIDValidator>;
