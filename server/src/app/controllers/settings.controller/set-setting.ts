import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';

import { prisma } from '@/db';

const setSettingSearchParamsSchema = z.object({
  id: z.coerce.number({ message: 'Settings ID must be a number' }).optional(),
  key: z.string({ message: 'Key must be a string' }).optional(),
  value: z.string({ message: 'Value must be a string' }),
});

export const setSetting = catchAsyncError(async (req, res) => {
  const { id, key, value } = setSettingSearchParamsSchema.parse(req.params);

  const setting = await prisma.settings.findUnique({
    where: {
      id,
      key,
    },
  });

  if (!setting) {
    throw new CustomError(404, 'Settings not found');
  }

  await prisma.settings.update({
    where: {
      id,
      key,
    },
    data: {
      value,
    },
  });

  res.json({
    success: true,
    message: 'Settings updated successfully',
  });
});
