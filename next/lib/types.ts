export type ExtractField<T, Field extends keyof any> = T extends Record<
  Field,
  infer U
>
  ? U
  : never;

/**
 * A generic type that defines an array with a fixed maximum length.
 *
 * @template T - The type of elements in the array.
 * @template Length - The exact number of elements that the array can hold.
 *
 * This type enforces that:
 * - The array contains elements of the specified type `T`.
 * - The array has an exact fixed length defined by `Length`.
 *
 * Using `Array<T> & { length: Length }`, we ensure that:
 * - The array behaves like a standard array (with all usual array methods).
 * - The `length` property is restricted to the specified maximum value.
 *
 * By using a conditional type (`Length extends Length ? ... : never`), we:
 * - Ensure that the specified `Length` is a valid numeric value.
 * - Protect the type definition from unexpected issues during usage.
 *
 * Example usage:
 * ```
 * // Creating an array of strings with a maximum length of 5
 * let fiveStrings: MaxLengthArray<string, 5>;
 * fiveStrings = ["hello", "world", "typescript", "generic", "array"]; // Valid
 * // fiveStrings = ["one", "two", "three", "four", "five", "six"]; // Error
 *
 * // Creating an array of numbers with a maximum length of 3
 * let threeNumbers: MaxLengthArray<number, 3>;
 * threeNumbers = [1, 2, 3]; // Valid
 * ```
 *
 * Credit:
 * `@FCS-UTILS`
 *
 * @type {MaxLengthArray<T, Length>}
 */ export type MaxLengthArray<T, Length extends number> = Length extends 1
  ? [T]
  : Length extends 2
  ? [T, T]
  : Length extends 3
  ? [T, T, T]
  : Length extends 4
  ? [T, T, T, T]
  : never;

/**
 * A generic type that Omits multiple properties from an object type.
 *
 * Credit:
 * `@FCS-UTILS`
 */ export type OmitMultiple<T, K extends keyof any> = Pick<
  T,
  Exclude<keyof T, K>
>;
