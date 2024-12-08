import { useGoBack } from '@/hooks/useGoBack';
import { cn } from '@/utils/cn';
import { ChevronLeft } from 'lucide-react';

type GoBackButtonProps = {
  className?: string;
};

export const GoBackButton = ({ className }: GoBackButtonProps) => {
  const { goBack } = useGoBack();
  return (
    <button
      onClick={goBack}
      className={cn('rounded-full p-1 hover:bg-clr-neutral/20', className)}
    >
      <ChevronLeft className="h-6 text-clr-neutral" />
    </button>
  );
};
