import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

export type InputItemProps = ComponentPropsWithoutRef<'div'>;

export const InputItem = ({ className, ...props }: InputItemProps) => {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />;
};
