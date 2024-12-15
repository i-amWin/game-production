import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { BottomNav } from '@/components/bottom-nav';

import { useUser } from '@/session/user';

export function AuthenticatedLayout() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <div className="bg-background">
      <div className="relative mx-auto flex min-h-screen max-w-[26rem] flex-col overflow-x-hidden bg-clr-neutral">
        <div className="w-full px-4 py-3">
          {user ? <Outlet /> : 'Loading...'}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
