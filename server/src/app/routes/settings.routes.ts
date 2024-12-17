import { Router } from 'express';

import { authenticate, verifyRoles } from '@/app/middlewares/auth.middleware';

import { settingsController } from '../controllers/settings.controller';

const router = Router();

router.get('/', authenticate, settingsController.getSettings);
router.get('/setting', authenticate, settingsController.getSetting);
router.post(
  '/',
  authenticate,
  verifyRoles('ADMIN'),
  settingsController.createSetting
);
router.patch(
  '/',
  authenticate,
  verifyRoles('ADMIN'),
  settingsController.setSetting
);
router.delete(
  '/',
  authenticate,
  verifyRoles('ADMIN'),
  settingsController.removeSetting
);

export default router;
