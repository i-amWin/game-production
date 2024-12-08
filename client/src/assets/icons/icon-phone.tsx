import { IconProps } from './types';

export const IconPhone = ({ ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <path
        opacity="0.6"
        d="M7.20001 9.19999C7.20001 5.88628 9.8863 3.19998 13.2 3.19998H34.8C38.1137 3.19998 40.8 5.88627 40.8 9.19998V28H7.20001V9.19999Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.8 29.6H7.20001V38.8C7.20001 42.1137 9.88631 44.8 13.2 44.8H34.8C38.1137 44.8 40.8 42.1137 40.8 38.8V29.6ZM20 33.6C19.1164 33.6 18.4 34.3163 18.4 35.2C18.4 36.0836 19.1164 36.8 20 36.8H28C28.8837 36.8 29.6 36.0836 29.6 35.2C29.6 34.3163 28.8837 33.6 28 33.6H20Z"
        fill="currentColor"
      />
    </svg>
  );
};
