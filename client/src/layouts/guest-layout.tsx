import { GuestHeader } from '@/components/guest-header';
import capitalize from 'lodash/capitalize';
import { Outlet, useLocation } from 'react-router';
// import { Toaster } from 'sonner';

export function GuestLayout() {
  const trimmedUrl = useLocation().pathname.substring(1).split('?')[0];

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
      {/* <Toaster richColors position="top-center" closeButton /> */}
    </div>
  );
}
