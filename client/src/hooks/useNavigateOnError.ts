import { useNavigate } from 'react-router';

export const useNavigateOnError = (pathname: string) => {
  const navigate = useNavigate();

  return {
    onDismiss: () => {
      navigate(pathname);
    },
    onAutoClose: () => {
      navigate(pathname);
    },
  };
};
