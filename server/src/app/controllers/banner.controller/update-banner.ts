import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';
import { deleteImage, uploadImage } from '@/utils/image';

import { prisma } from '@/db';

const updateBannerParamSchema = z.object({
  id: z.coerce.number({ message: 'Banner ID must be a number' }),
});

const updateBannerSchema = z.object({
  image: z.string({ message: 'Image must be a string' }).optional(),
  status: z.boolean({ message: 'Status must be a boolean' }).optional(),
});

export const updateBanner = catchAsyncError(async (req, res) => {
  const { id } = updateBannerParamSchema.parse(req.params);
  const { image, status } = updateBannerSchema.parse(req.body);

  const banner = await prisma.banner.findUnique({
    where: { id },
  });

  if (!banner) {
    throw new CustomError(404, 'Banner not found');
  }

  const updateData: { image?: string; status?: boolean } = {};

  if (image !== undefined) {
    if (banner.image) {
      await deleteImage(banner.image);
    }

    updateData.image = await uploadImage(image);
  }

  if (status !== undefined) {
    updateData.status = status;
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.banner.update({
      where: { id },
      data: updateData,
    });
  }

  res.json({
    success: true,
    message: 'Banner updated successfully',
  });
});
