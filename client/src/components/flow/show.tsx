import React from 'react';

type ShowProps = {
  when: boolean;
  children: React.ReactNode;
  otherwise?: React.ReactNode;
};

export const Show = ({ when, children, otherwise = null }: ShowProps) => {
  return when ? <>{children}</> : <>{otherwise}</>;
};
