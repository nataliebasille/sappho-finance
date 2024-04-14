"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type NavLinkProps = {
  className?: string;
  href: string;
  children?: React.ReactNode;
  strict?: boolean;
};

export const NavLink = ({
  className,
  href,
  children,
  strict = false,
}: NavLinkProps) => {
  const pathname = usePathname();
  const active = strict ? pathname === href : pathname.startsWith(href);
  const c = twMerge(className, active && "active");
  return (
    <Link className={c} href={href}>
      {children}
    </Link>
  );
};
