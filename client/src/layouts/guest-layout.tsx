import capitalize from 'lodash/capitalize';

import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { GuestHeader } from '@/components/guest-header';

import { useUser } from '@/session/user';

export function GuestLayout() {
  const navigate = useNavigate();
  const trimmedUrl = useLocation().pathname.substring(1).split('?')[0];
  const user = useUser();

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  const title = capitalize(trimmedUrl);
  const description =
    trimmedUrl === 'login'
      ? 'Login to your account'
      : 'Please register by phone number or email address';

  return (
    <div className="bg-background">
      <div className="mx-auto flex min-h-screen max-w-[26rem] flex-col overflow-x-hidden bg-clr-neutral">
        <GuestHeader title={title} description={description} />
        <div className="w-full px-4 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
