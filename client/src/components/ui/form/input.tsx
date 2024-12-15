import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/utils/cn';

export type InputProps = ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'rounded-xl border-none bg-white px-4 py-3 shadow-sm placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-300 disabled:bg-neutral-100 disabled:text-neutral-500',
          className
        )}
        {...props}
      />
    );
  }
);
