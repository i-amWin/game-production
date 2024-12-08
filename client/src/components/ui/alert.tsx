import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import { ComponentPropsWithRef, forwardRef } from 'react';

const AlertVariants = cva(
  'inline-flex justify-center rounded-full font-medium text-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-gradient-primary text-white hover:opacity-90',
        outline: 'border border-primary text-primary hover:bg-primary/[.05]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends ComponentPropsWithRef<'div'>,
    VariantProps<typeof AlertVariants> {
  asChild?: boolean;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(AlertVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Alert.displayName = 'Alert';

export { Alert, AlertVariants };
