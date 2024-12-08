import { ComponentPropsWithoutRef } from 'react';

export type IconProps = Omit<
  ComponentPropsWithoutRef<'svg'>,
  'xmlns' | 'viewBox' | 'fill'
>;
