import { deleteBanner } from './delete-banner';
import { getBanner } from './get-banner';
import { getBanners } from './get-banners';
import { postBanner } from './post-banner';
import { updateBanner } from './update-banner';

export const bannerController = {
  getBanner,
  getBanners,
  postBanner,
  updateBanner,
  deleteBanner,
};
