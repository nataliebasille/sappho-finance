import Link from "next/link";
import type { FC } from "react";
import type { ZodSchema, infer as Infer } from "zod";

type PageDeclaration<TName extends string, TParams extends ZodSchema> = {
  [K in `${Capitalize<TName>}Page`]: FC;
} & {
  [K in `${Capitalize<TName>}Link`]: (params: Infer<TParams>) => JSX.Element;
};

export function createPage<TName extends string, TParams extends ZodSchema>({
  name,
  path,
  params,
  component: Page,
}: {
  name: TName;
  path: string;
  params?: TParams;
  component: <TProps>(
    props: TProps & { params: NoInfer<TParams> },
  ) => JSX.Element;
}) {
  const capitalizedName =
    `${name[0].toUpperCase()}${name.slice(1)}` as Capitalize<TName>;
  path = normalizePath(path);
  return {
    [`${capitalizedName}Page`]: () => {
      return <Page params={{} as unknown as TParams} />;
    },
    [`${capitalizedName}Link`]: createLinkComponent(capitalizedName, path),
  } as PageDeclaration<TName, TParams>;
}

type LinkProps<TParams extends ZodSchema> = {
  children?: React.ReactNode;
  className?: string;
};

function createLinkComponent<TParams extends ZodSchema>(
  name: string,
  path: string,
) {
  const LinkComponent = ({ children, className }: LinkProps<TParams>) => {
    return (
      <Link className={className} href={path}>
        {children}
      </Link>
    );
  };

  LinkComponent.displayName = `${name}Link`;

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
    .replace(/\/page.tsx$/, "")
    .replace(/\(.*\)/, "");

  return normalizedPath ? normalizedPath : "/";
}
