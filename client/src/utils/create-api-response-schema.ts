import { z } from 'zod';

// Generic function to create an API response schema
export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  const baseResponseSchema = z.object({
    message: z.string(),
  });

  const successResponseSchema = baseResponseSchema.extend({
    success: z.literal(true),
    data: dataSchema,
  });

  const failureResponseSchema = baseResponseSchema.extend({
    success: z.literal(false),
  });

  return z.discriminatedUnion('success', [
    successResponseSchema,
    failureResponseSchema,
  ]);
}
