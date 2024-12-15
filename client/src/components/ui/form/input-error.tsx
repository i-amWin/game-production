import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

export type InputErrorProps = ComponentPropsWithoutRef<'p'>;

export const InputError = ({
  className,
  children,
  ...props
}: InputErrorProps) => {
  if (children) {
    return (
      <p className={cn('text-sm text-rose-500', className)} {...props}>
        {children}
      </p>
    );
  }

  return null;
};
