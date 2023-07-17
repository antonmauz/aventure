import z from "zod";

export const schemaForType =
  <T>() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <S extends z.ZodType<T, any, any>>(argument: S) =>
    argument;

export const parseData = <T extends z.ZodTypeAny>(schema: T, data: unknown): T["_output"] => {
  try {
    return schema.parse(data);
  } catch (error) {
    console.log(error);

    throw error;
  }
};
