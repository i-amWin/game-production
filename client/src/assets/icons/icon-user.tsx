import { IconProps } from './types';

export const IconUser = ({ ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <path
        d="M24 24C26.6522 24 29.1957 22.9464 31.0711 21.0711C32.9464 19.1957 34 16.6522 34 14C34 11.3478 32.9464 8.8043 31.0711 6.92893C29.1957 5.05357 26.6522 4 24 4C21.3478 4 18.8043 5.05357 16.9289 6.92893C15.0536 8.8043 14 11.3478 14 14C14 16.6522 15.0536 19.1957 16.9289 21.0711C18.8043 22.9464 21.3478 24 24 24Z"
        fill="currentColor"
      />
      <path
        d="M6 44C6 35.1634 13.1634 28 22 28H26C34.8366 28 42 35.1634 42 44H6Z"
        fill="currentColor"
      />
    </svg>
  );
};
