import type { ZodSchema } from "zod";
import { NavLink } from "./nav-link";

export function createLink<TParams extends ZodSchema>({
  path,
  strict,
  params,
}: {
  path: string;
  strict?: boolean;
  params?: TParams;
}) {
  return createLinkComponent({
    normalizedPath: normalizePath(path),
    strict,
    params,
  });
}

type LinkProps<TParams extends ZodSchema> = {
  children?: React.ReactNode;
  className?: string;
};

function createLinkComponent<TParams extends ZodSchema>({
  normalizedPath,
  strict,
  params,
}: {
  normalizedPath: string;
  strict?: boolean;
  params?: TParams;
}) {
  const LinkComponent = ({ children, className }: LinkProps<TParams>) => {
    return (
      <NavLink className={className} href={normalizedPath} strict={strict}>
        {children}
      </NavLink>
    );
  };

  return LinkComponent;
}

function normalizePath(path: string) {
  const srcAppIndex = (() => {
    const withApp = path.indexOf("/src/app/");
    return withApp < 0
      ? path.indexOf("/src/") + "/src/".length
      : withApp + "/src/app/".length;
  })();

  const normalizedPath = path
    .slice(srcAppIndex)
    // Remove file name so we have just the directory
    .replace(/(.*)\/.*.tsx$/, "$1")
    // Remove any route groups
    .replace(/\(.*\)/, "");

  return `/${normalizedPath}`;
}
