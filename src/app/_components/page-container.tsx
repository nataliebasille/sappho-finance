import { twMerge } from "tailwind-merge";

export const PageContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={twMerge("md:m-auto md:max-w-4xl", className)}>
      {children}
    </div>
  );
};
