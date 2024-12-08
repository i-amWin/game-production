import { ComponentPropsWithoutRef } from 'react';
import { Input } from './input';

export type NumberInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'onChange'
> & {
  onChange?: (value: string) => void;
};

export const NumberInput = ({ onChange, ...props }: NumberInputProps) => {
  const handleChange = (value: string) => {
    if (/^\d+$/.test(value) || value === '') {
      onChange?.(value);
    }
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      onChange={(e) => handleChange(e.target.value)}
      {...props}
    />
  );
};
