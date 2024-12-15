import { z } from 'zod';
import { api } from '.';
import { createApiResponseSchema } from '@/utils/create-api-response-schema';
import { UserSchema } from './schema-and-types';

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

const getMeApiResponseSchema = createApiResponseSchema(UserSchema);

export const getMe = async () => {
  const { data } = await api.get('/users/me?withWallet=true');
  console.log('Once');
  return getMeApiResponseSchema.parse(data);
};
