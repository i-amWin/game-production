import { api } from '.';

type ApiResponse<T> = {
  success: false;
  message: string;
  data?: T;
};

export const getNameByInviteCode = async (inviteCode: string | null) => {
  const { data } = await api.get('/users/invite-code-by-name', {
    params: {
      inviteCode,
    },
  });
  return data as ApiResponse<{ name: string }>;
};
