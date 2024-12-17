import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';

import { prisma } from '@/db';

const removeSettingSearchParamsSchema = z.object({
  id: z.coerce.number({ message: 'Settings ID must be a number' }).optional(),
  key: z.string({ message: 'Key must be a string' }).optional(),
});

export const removeSetting = catchAsyncError(async (req, res) => {
  const { id, key } = removeSettingSearchParamsSchema.parse(req.params);

  const setting = await prisma.settings.findUnique({
    where: {
      id,
      key,
    },
  });

  if (!setting) {
    throw new CustomError(404, 'Settings not found');
  }

  await prisma.settings.delete({
    where: {
      id,
      key,
    },
  });

  res.json({
    success: true,
    message: 'Settings removed successfully',
  });
});
