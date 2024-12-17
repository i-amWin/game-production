import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { prisma } from '@/db';

const getSettingSearchParamsSchema = z.object({
  ids: z
    .string({ message: 'Ids must be a string' })
    .optional()
    .transform((value) => value?.split(',').map(Number))
    .refine((ids) => ids?.every((id) => !isNaN(id)), {
      message: 'Ids must be a comma separated list of numbers',
    }),
  keys: z
    .string({ message: 'Keys must be a string' })
    .optional()
    .transform((value) => value?.split(','))
    .refine((keys) => keys?.every((key) => typeof key === 'string'), {
      message: 'Keys must be a comma separated list of strings',
    }),
});

export const getSettings = catchAsyncError(async (req, res) => {
  const { ids, keys } = getSettingSearchParamsSchema.parse(req.params);

  const settings = await prisma.settings.findMany({
    where: {
      id: ids ? { in: ids } : undefined,
      key: keys ? { in: keys } : undefined,
    },
  });

  res.json({
    success: true,
    message: 'Settings fetched successfully',
    data: {
      settings,
    },
  });
});
