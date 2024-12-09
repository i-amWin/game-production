import { z } from 'zod';
import { api } from '.';
import { createApiResponseSchema } from '@/utils/create-api-response-schema';

const getNameByInviteCodeSchema = createApiResponseSchema(
  z.object({ name: z.string() })
);

export const getNameByInviteCode = async (inviteCode: string | null) => {
  const { data } = await api.get('/users/invite-code-by-name', {
    params: {
      inviteCode,
    },
  });

  return getNameByInviteCodeSchema.parse(data);
};

const WalletSchema = z.object({
  id: z.number(),
  userId: z.number(),
  rechargeWallet: z.coerce.number(),
  winningWallet: z.coerce.number(),
  bonusWallet: z.coerce.number(),
});

const RoleSchema = z.enum(['ADMIN', 'USER']);
const ActiveStatus = z.enum(['ACTIVE', 'IN_ACTIVE']);
const BlockStatus = z.enum(['BLOCKED', 'UN_BLOCKED']);

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  password: z.string(),
  referralCode: z.string().nullable(),
  referredBy: z.number().nullable(),
  role: RoleSchema,
  activatedAt: z.string().nullable(),
  activeStatus: ActiveStatus,
  blockStatus: BlockStatus,
  createdAt: z.string(),
  updatedAt: z.string(),
  wallet: WalletSchema.nullable(),
});

const getMeApiResponseSchema = createApiResponseSchema(UserSchema);

export const getMe = async () => {
  const { data } = await api.get('/users/me?withWallet=true');
  console.log('Once');
  return getMeApiResponseSchema.parse(data);
};
