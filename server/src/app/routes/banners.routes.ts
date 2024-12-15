import { Router } from 'express';

import { bannerController } from '@/app/controllers/banner.controller';
import { authenticate, verifyRoles } from '@/app/middlewares/auth.middleware';

const router = Router();

router.get('/:id', authenticate, bannerController.getBanner);
router.get('/', authenticate, bannerController.getBanners);
router.post(
  '/',
  authenticate,
  verifyRoles('ADMIN'),
  bannerController.postBanner
);
router.patch(
  '/:id',
  authenticate,
  verifyRoles('ADMIN'),
  bannerController.updateBanner
);
router.delete(
  '/:id',
  authenticate,
  verifyRoles('ADMIN'),
  bannerController.deleteBanner
);

export default router;
