import { RegisterWithPhoneData } from '@/pages/auth/components/register-with-phone';
import { api } from '.';
import { createApiResponseSchema } from '@/utils/create-api-response-schema';
import { z } from 'zod';
import { LoginWithPhoneData } from '@/pages/auth/components/login-with-phone';

const registerWithPhoneSchema = createApiResponseSchema(z.undefined());

export const registerApi = async (body: RegisterWithPhoneData) => {
  const { data } = await api.post('/auth/register', {
    referralCode: body.invite_code,
    name: body.name,
    phone: body.phone,
    password: body.password,
  });

  return registerWithPhoneSchema.parse(data);
};

const loginWithPhoneSchema = createApiResponseSchema(z.undefined());

export const loginApi = async (body: LoginWithPhoneData) => {
  const { data } = await api.post('/auth/login', {
    phone: body.phone,
    password: body.password,
  });

  return loginWithPhoneSchema.parse(data);
};
