import ApplicationLogo from "@/components/application-logo";
import { IconNotification } from "@/Icons/IconNotification";
import { cn } from "@/Utils/cn";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode, useState } from "react";

export default function Authenticated({
  header,
  className,
  children,
}: PropsWithChildren<{ header?: ReactNode; className?: string }>) {
  const user = usePage().props.auth.user;

  return (
    <div className="bg-background">
      <div className="mx-auto flex min-h-screen max-w-[26rem] flex-col overflow-x-hidden bg-clr-neutral">
        <header className="fixed left-1/2 top-0 z-[998] flex w-full max-w-[26rem] -translate-x-1/2 items-center justify-between bg-white px-4 py-2">
          <Link href="/">
            <ApplicationLogo className="h-8 fill-primary" />
          </Link>

          <Link href="#">
            <IconNotification className="h-8 w-8 text-primary" />
          </Link>
        </header>

        <main className={cn("py-16", className)}>{children}</main>
      </div>
    </div>
  );
}
