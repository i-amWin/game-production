import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as Tabs from '@radix-ui/react-tabs';

// import { LoginWithEmail } from './components/login-with-email';
import { LoginWithPhone } from './components/login-with-phone';
import { For } from '@/components/flow/for';
import { Show } from '@/components/flow/show';

// import { IconEmail } from '@/assets/icons/icon-email';
import { IconPhone } from '@/assets/icons/icon-phone';

import { CONSTANTS } from '@/constants';

const tabs = [
  {
    name: 'phone',
    label: 'Phone Number',
    Icon: IconPhone,
    Content: <LoginWithPhone />,
  },
  // {
  //   name: 'email',
  //   label: 'Email Address',
  //   Icon: IconEmail,
  //   Content: <LoginWithEmail />,
  // },
];

export function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
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
        <title>{CONSTANTS.APP_NAME} | Login</title>
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
          {(tab) => (
            <Tabs.Content key={tab.name} value={tab.name}>
              <AnimatePresence>{tab.Content}</AnimatePresence>
            </Tabs.Content>
          )}
        </For>
      </Tabs.Root>
    </>
  );
}
