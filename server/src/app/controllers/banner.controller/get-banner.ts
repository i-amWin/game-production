import { z } from 'zod';

import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { CustomError } from '@/utils/custom-error';
import { getImage } from '@/utils/image';

import { prisma } from '@/db';

const getBannerParamSchema = z.object({
  id: z.coerce.number({ message: 'Banner ID must be a number' }),
});

export const getBanner = catchAsyncError(async (req, res) => {
  const { id } = getBannerParamSchema.parse(req.params);

  const banner = await prisma.banner.findUnique({
    where: {
      id,
    },
  });

  if (!banner) {
    throw new CustomError(404, 'Banner not found');
  }

  if (req.user!.role !== 'ADMIN' && banner.status !== true) {
    throw new CustomError(403, 'You are not allowed to view this banner');
  }

  banner.image = await getImage(banner.image);

  res.json({
    success: true,
    message: 'Banner details fetched successfully',
    data: banner,
  });
});
