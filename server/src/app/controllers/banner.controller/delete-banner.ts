import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';
import { deleteImage } from '@/utils/image';

import { prisma } from '@/db';

const deleteBannerParamSchema = z.object({
  id: z.coerce.number({ message: 'Banner ID must be a number' }),
});

export const deleteBanner = catchAsyncError(async (req, res) => {
  const { id } = deleteBannerParamSchema.parse(req.params);

  const banner = await prisma.banner.findUnique({
    where: {
      id,
    },
  });

  if (!banner) {
    throw new CustomError(404, 'Banner not found');
  }

  if (banner.image) {
    await deleteImage(banner.image);
  }

  await prisma.banner.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Banner deleted successfully',
  });
});
