/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ZodObject,
  type ZodString,
  type ZodNumber,
  type ZodBoolean,
  type ZodDate,
  type ZodBigInt,
  type ZodUndefined,
  type ZodNull,
  type ZodEffects,
  type ZodType,
  type infer as Infer,
  type ZodTypeAny,
  ZodError,
} from "zod";

import {
  type NestedKeyOf,
  isZodArray,
  isZodBigInt,
  isZodBoolean,
  isZodDate,
  isZodEffects,
  isZodNull,
  isZodNumber,
  isZodObject,
  isZodString,
  isZodUndefined,
} from "./helpers";

type ZodPrimitive =
  | ZodString
  | ZodNumber
  | ZodBoolean
  | ZodDate
  | ZodBigInt
  | ZodUndefined
  | ZodNull;

type ZodSchema = ZodObject<any> | ZodEffects<any>;

type FormParser<TType extends ZodTypeAny> = (
  formData: FormData,
) => Promise<Infer<TType>>;

export function createFormParser<TType extends ZodSchema>(
  schema: TType,
): FormParser<TType> {
  const parser = (formData: FormData) => {
    const data = formDataToObject(formData, schema);

    return schema.parseAsync(data);
  };

  return parser as FormParser<TType>;
}

export type ValidationErrors<TIn> = {
  [P in NestedKeyOf<TIn>]?: string;
};

export type FormActionResult<TIn, TResult = TIn> =
  | {
      type: "success";
      data: TResult;
    }
  | {
      type: "error";
      reason: "validation";
      errors: ValidationErrors<TIn>;
    }
  | {
      type: "error";
      reason: "unhandled";
      error: string;
    };

export type FormAction<TIn, TResult = TIn> = (
  formData: FormData,
) => Promise<FormActionResult<TResult, TResult>>;

export function createFormAction<TSchema extends ZodSchema>(
  schema: TSchema,
  action: (data: Infer<TSchema>) => Promise<void>,
): FormAction<Infer<TSchema>>;
export function createFormAction<TSchema extends ZodSchema, TResult>(
  schema: TSchema,
  action: (data: Infer<TSchema>) => Promise<TResult>,
): FormAction<Infer<TSchema>, TResult>;
export function createFormAction<TSchema extends ZodSchema, TResult>(
  schema: TSchema,
  action: (data: Infer<TSchema>) => Promise<TResult>,
): FormAction<Infer<TSchema>, TResult> {
  const parser = createFormParser(schema);

  return async (formData: FormData) => {
    try {
      const data = await parser(formData);
      const result = await action(data);
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      return { type: "success", data: result === undefined ? data : result };
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.reduce(
          (acc, error) => {
            const path = error.path.join(".");
            acc[path as NestedKeyOf<Infer<TSchema>>] = error.message;
            return acc;
          },
          {} as Record<NestedKeyOf<Infer<TSchema>>, string>,
        );
        return { type: "error", reason: "validation", errors };
      }

      return {
        type: "error",
        reason: "unhandled",
        error: error instanceof Error ? error.message : "Unhandled error",
      };
    }
  };
}

function formDataToObject(
  formData: FormData,
  schema: ZodSchema,
  namePrefix = "",
) {
  const shape = getSchemaShape(schema);
  const obj: Record<string, any> = {};
  for (const [property, propertySchema] of Object.entries(shape)) {
    const name = `${namePrefix ? `${namePrefix}.` : ""}${property}`;

    if (isZodArray(propertySchema)) {
      const { element: elementSchema } = propertySchema;

      if (isPrimitive(elementSchema)) {
        obj[property] = formData
          .getAll(name)
          .map((value) => transformPrimitive(value, elementSchema));
      } else if (isZodObject(elementSchema)) {
        obj[property] = indexBased_formDataForArrayOfObjects(
          formData,
          elementSchema,
          name,
        );
      }
    } else if (isZodObject(propertySchema)) {
      obj[property] = formDataToObject(formData, propertySchema, name);
    } else {
      obj[property] = transformPrimitive(formData.get(name)!, propertySchema);
    }
  }

  return obj;
}

function getSchemaShape(schema: ZodSchema): Record<string, ZodTypeAny> {
  if (isZodEffects(schema)) {
    return getSchemaShape(schema._def.schema);
  }

  return schema.shape as Record<string, ZodTypeAny>;
}

function transformPrimitive(value: FormDataEntryValue, schema: ZodType) {
  const valueType = typeof value;
  if (value !== null && valueType === "object") {
    throw new Error(
      `Form value types of non strings are not yet supported. Sorry :(`,
    );
  }

  return isZodNumber(schema)
    ? parseFloat(value as string) || null
    : isZodBoolean(schema)
      ? value === "true"
      : isZodDate(schema)
        ? new Date(value as string)
        : isZodBigInt(schema)
          ? BigInt(value as string)
          : isZodUndefined(schema) && (value === "undefined" || value === "")
            ? undefined
            : isZodNull(schema) && (value === null || value === "")
              ? null
              : value;
}

function isPrimitive(schema: ZodType): schema is ZodPrimitive {
  return (
    isZodString(schema) ||
    isZodNumber(schema) ||
    isZodBoolean(schema) ||
    isZodDate(schema) ||
    isZodBigInt(schema) ||
    isZodUndefined(schema) ||
    isZodNull(schema)
  );
}

function indexBased_formDataForArrayOfObjects(
  formData: FormData,
  elementSchema: ZodObject<any>,
  name: string,
) {
  const obj = [];
  const shape = getSchemaShape(elementSchema);
  let index = 0;
  while (
    Object.keys(shape).some((property) =>
      formData.has(`${name}.${index}.${property}`),
    )
  ) {
    obj.push(formDataToObject(formData, elementSchema, `${name}.${index}`));
    index++;
  }

  return obj;
}
