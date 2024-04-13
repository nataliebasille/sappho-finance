"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type NavLinkProps = {
  className?: string;
  href: string;
  children?: React.ReactNode;
};

export const NavLink = ({ className, href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link className={twMerge(className, active && "active")} href={href}>
      {children}
    </Link>
  );
};
