import { useQuery } from 'react-query';

import { getMe } from '@/api/users';

export const useUser = () => {
  const { data } = useQuery(['users', 'me'], {
    queryFn: getMe,
    refetchOnWindowFocus: false,
  });
  if (!data?.success) return null;

  return data.data;
};
