import { type CSSProperties } from "react";

export const LoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className="radial-progress progress-secondary progress-sm m-auto animate-spin"
        style={{ "--progress": "25%" } as CSSProperties}
      />
      loading...
    </div>
  );
};
