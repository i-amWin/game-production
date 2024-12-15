import { catchAsyncError } from '@/app/helpers/catch-async-error';

import { getImage } from '@/utils/image';

import { prisma } from '@/db';

export const getBanners = catchAsyncError(async (req, res) => {
  const banners = await prisma.banner.findMany({
    where: {
      status: req.user!.role === 'ADMIN' ? undefined : true,
    },
  });

  const updatedBanners = await Promise.all(
    banners.map(async (banner) => {
      return {
        ...banner,
        image: await getImage(banner.image),
      };
    })
  );

  res.json({
    success: true,
    message: 'Banner details fetched successfully',
    data: updatedBanners,
  });
});
