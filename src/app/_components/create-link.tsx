import type { ZodSchema } from "zod";
import { NavLink } from "./nav-link";

export function createLink<TParams extends ZodSchema>({
  path,
  params,
}: {
  path: string;
  params?: TParams;
}) {
  return createLinkComponent(normalizePath(path));
}

type LinkProps<TParams extends ZodSchema> = {
  children?: React.ReactNode;
  className?: string;
};

function createLinkComponent<TParams extends ZodSchema>(path: string) {
  const LinkComponent = ({ children, className }: LinkProps<TParams>) => {
    return (
      <NavLink className={className} href={path}>
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
    .replace(/\/.*.tsx$/, "")
    // Remove any route groups
    .replace(/\(.*\)/, "");

  return `/${normalizedPath}`;
}
