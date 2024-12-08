import { getMe } from '@/app/controllers/user.controller/get-me';
import { getNameByInviteCode } from '@/app/controllers/user.controller/get-name-by-invite-code';
import { getUser } from '@/app/controllers/user.controller/get-user';
import { getUsers } from '@/app/controllers/user.controller/get-users';

export const userController = { getMe, getUser, getUsers, getNameByInviteCode };
