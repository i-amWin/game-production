import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';

import { prisma } from '@/db';

const getSettingSearchParamsSchema = z.object({
  id: z.coerce.number({ message: 'Settings ID must be a number' }).optional(),
  key: z.string({ message: 'Key must be a string' }).optional(),
});

export const getSetting = catchAsyncError(async (req, res) => {
  const { id, key } = getSettingSearchParamsSchema.parse(req.params);

  const setting = await prisma.settings.findUnique({
    where: {
      id,
      key,
    },
  });

  if (!setting) {
    throw new CustomError(404, 'Settings not found');
  }

  res.json({
    success: true,
    message: 'Settings fetched successfully',
    data: {
      setting,
    },
  });
});
