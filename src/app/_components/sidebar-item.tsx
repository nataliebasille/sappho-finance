"use client";

import { useCallback, type PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

type SidebarItemProps = PropsWithChildren<{
  href: string;
}>;

export const SidebarItem = ({ href, children }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(href);
  }, [router, href]);

  return (
    <li
      className={twMerge(
        "list-item",
        "hover:!bg-white/20",
        "hover:!text-white",
        href && pathname.startsWith(href) && "!bg-white/40",
      )}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};
