export type ExtractField<T, Field extends keyof any> = T extends Record<
  Field,
  infer U
>
  ? U
  : never;
