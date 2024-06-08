import ObjectID from "bson-objectid";
import { z } from "zod";

const MongoIDAsString = z.string().refine((val) => {
  return ObjectID.isValid(val);
});

const MongoIDAsObject = z.custom<ObjectID>();

export const MongoIDValidator = z
  .union([MongoIDAsString, MongoIDAsObject])
  .transform((data) => {
    // If the data is an object and has a toString method, call it, otherwise return the data directly
    if (typeof data === "object" && typeof data.toString === "function") {
      return data.toString();
    }
    return data;
  });
