import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';

import { prisma } from '@/db';

const createSettingSearchParamsSchema = z.object({
  key: z.string({ message: 'Key must be a string' }),
  value: z.string({ message: 'Value must be a string' }),
});

export const createSetting = catchAsyncError(async (req, res) => {
  const { key, value } = createSettingSearchParamsSchema.parse(req.params);

  const setting = await prisma.settings.findUnique({
    where: {
      key,
    },
  });

  if (setting) {
    throw new CustomError(400, 'Settings already exists');
  }

  await prisma.settings.create({
    data: {
      key,
      value,
    },
  });

  res.json({
    success: true,
    message: 'Settings created successfully',
  });
});
