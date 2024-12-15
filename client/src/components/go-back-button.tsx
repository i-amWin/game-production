import { ChevronLeft } from 'lucide-react';

import { useGoBack } from '@/hooks/useGoBack';

import { cn } from '@/utils/cn';

type GoBackButtonProps = {
  className?: string;
  pathname?: string;
};

export const GoBackButton = ({ className, pathname }: GoBackButtonProps) => {
  const { goBack } = useGoBack();
  return (
    <button
      onClick={() => goBack(pathname)}
      className={cn('rounded-full p-1 hover:bg-clr-neutral/20', className)}
    >
      <ChevronLeft className="h-6 text-clr-neutral" />
    </button>
  );
};
