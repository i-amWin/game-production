import { RegisterWithPhoneData } from '@/pages/auth/components/register-with-phone';
import { api } from '.';

export const registerApi = (data: RegisterWithPhoneData) => {
  return api.post('/auth/register', data);
};
