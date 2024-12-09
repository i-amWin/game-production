import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as Tabs from '@radix-ui/react-tabs';

// import { RegisterWithEmail } from './components/register-with-email';
import { RegisterWithPhone } from './components/register-with-phone';
import { For } from '@/components/flow/for';
import { Show } from '@/components/flow/show';

// import { IconEmail } from '@/assets/icons/icon-email';
import { IconPhone } from '@/assets/icons/icon-phone';

import { CONSTANTS } from '@/constants';
import { useQuery } from 'react-query';
import { getNameByInviteCode } from '@/api/users';
import { toast } from 'sonner';
import { useNavigateOnError } from '@/hooks/useNavigateOnError';

const tabs = [
  {
    name: 'phone',
    label: 'Phone Number',
    Icon: IconPhone,
    Content: RegisterWithPhone,
  },
  // {
  //   name: 'email',
  //   label: 'Email Address',
  //   Icon: IconEmail,
  //   Content: RegisterWithEmail,
  // },
];

export function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const inviteCode = searchParams.get('inviteCode');
  const navigateOnError = useNavigateOnError('/');

  const { data } = useQuery(['inviteCode', inviteCode], {
    queryFn: () => getNameByInviteCode(inviteCode),
    onError: () => {
      toast.error('Invalid Invite Code', {
        ...navigateOnError,
      });
    },
    retry: false,
  });

  const [active, setActive] = useState<string>(
    searchParams.get('method') || tabs[0].name
  );

  function handleValueChange(value: string) {
    setActive(value);
    setSearchParams((prev) => {
      prev.set('method', value);
      return prev;
    });
  }

  return (
    <>
      <Helmet>
        <title>{CONSTANTS.APP_NAME} | Register</title>
      </Helmet>

      <Tabs.Root defaultValue={active} onValueChange={handleValueChange}>
        <Tabs.List className="flex w-full border-b pb-2 text-primary">
          <For items={tabs}>
            {(tab) => (
              <Tabs.Trigger
                key={tab.name}
                value={tab.name}
                className="relative flex flex-1 flex-col items-center"
              >
                <tab.Icon className="w-8" />
                {tab.label}
                <Show when={active === tab.name}>
                  <motion.span
                    layoutId="active-bar"
                    className="relative -bottom-2 left-0 inline-block h-0.5 w-full rounded-full bg-primary"
                  />
                </Show>
              </Tabs.Trigger>
            )}
          </For>
        </Tabs.List>
        <For items={tabs}>
          {({ name, Content }) => (
            <Tabs.Content key={name} value={name}>
              <AnimatePresence>
                <Content
                  inviteCode={inviteCode}
                  sponsorName={data?.success ? data.data.name : ''}
                />
              </AnimatePresence>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
    </>
  );
}
