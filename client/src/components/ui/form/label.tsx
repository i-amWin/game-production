import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type LabelProps = ComponentPropsWithoutRef<'label'>;

export const Label = ({ className, ...props }: LabelProps) => {
  return <label className={cn('', className)} {...props} />;
};
