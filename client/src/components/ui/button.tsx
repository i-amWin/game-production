import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex justify-center rounded-full font-medium text-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-gradient-primary text-white hover:opacity-90',
        outline: 'border border-primary text-primary hover:bg-primary/[.05]',
      },
      size: {
        default: 'px-8 py-3',
        // sm: 'px-3',
        lg: 'px-10 py-4',
        // icon: 'h-10 w-10',
        full: 'w-full py-3 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
