import { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

export type LabelProps = ComponentPropsWithoutRef<'label'>;

export const Label = ({ className, ...props }: LabelProps) => {
  return <label className={cn('', className)} {...props} />;
};
