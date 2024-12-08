import { cn } from '@/utils/cn';
import { ComponentPropsWithoutRef } from 'react';

export type InputItemProps = ComponentPropsWithoutRef<'div'>;

export const InputItem = ({ className, ...props }: InputItemProps) => {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />;
};
