import { useCallback } from 'react';
import { Link, useLocation } from 'react-router';

import { cn } from '@/utils/cn';

import { IconActivity } from '@/assets/icons/icon-activity';
import { IconHome } from '@/assets/icons/icon-home';
import { IconMain } from '@/assets/icons/icon-main';
import { IconWallet } from '@/assets/icons/icon-wallet';
import BottomNavBg from '@/assets/images/bottom-nav-bg.png';

import { For } from './flow/for';

const links = [
  {
    name: 'Home',
    icon: IconHome,
    to: '/home',
  },
  {
    name: 'Activity',
    icon: IconActivity,
    to: '/activity',
  },
  {
    name: 'Promotion',
    icon: null,
    to: '/promotion',
  },
  {
    name: 'Wallet',
    icon: IconWallet,
    to: '/wallet',
  },
  {
    name: 'Profile',
    icon: IconMain,
    to: '/profile',
  },
];

export const BottomNav = () => {
  // Get the current pathname
  const pathname = useLocation().pathname;

  const isActive = useCallback(
    (to: string) => {
      return pathname.startsWith(to);
    },
    [pathname]
  );

  return (
    <section
      className="absolute bottom-0 h-[5rem] w-full px-4 py-2"
      style={{
        backgroundImage: `url(${BottomNavBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <nav className="flex h-full items-end justify-between">
        <For items={links}>
          {({ name, icon: Icon, to }) => (
            <Link
              to={to}
              className={cn('flex flex-col items-center', {
                'text-primary': isActive(to),
                'text-gray-500': !isActive(to),
              })}
            >
              <span>{Icon ? <Icon className="h-6 w-6" /> : null}</span>
              <span className="pt-1.5 text-xs">{name}</span>
            </Link>
          )}
        </For>
      </nav>
    </section>
  );
};
