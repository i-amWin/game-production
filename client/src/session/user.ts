import { getMe } from '@/api/users';
import { useQuery } from 'react-query';

export const useUser = () => {
  const { data } = useQuery(['users', 'me'], {
    queryFn: getMe,
    refetchOnWindowFocus: false,
  });
  if (!data?.success) return null;

  return data.data;
};
