import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export function useGoBack() {
  const navigate = useNavigate();

  const goBack = useCallback(
    (pathname?: string) => {
      if (pathname) {
        navigate(pathname, { replace: true });
      } else if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/', { replace: true });
      }
    },
    [navigate]
  );

  return { goBack };
}
