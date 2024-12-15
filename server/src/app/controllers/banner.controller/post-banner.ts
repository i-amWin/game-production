import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { uploadImage } from '@/utils/image';

import { prisma } from '@/db';

const postBannerSchema = z.object({
  image: z.string({ message: 'Image must be a string' }),
});

export const postBanner = catchAsyncError(async (req, res) => {
  const { image } = postBannerSchema.parse(req.body);

  const file_name = await uploadImage(image);

  await prisma.banner.create({
    data: {
      image: file_name,
    },
  });

  res.json({
    success: true,
    message: 'Banner created successfully',
  });
});
