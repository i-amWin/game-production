import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { useUser } from '@/session/user';

export function AuthenticatedLayout() {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <div className="bg-background">
      <div className="mx-auto flex min-h-screen max-w-[26rem] flex-col overflow-x-hidden bg-clr-neutral">
        <div className="w-full px-4 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
