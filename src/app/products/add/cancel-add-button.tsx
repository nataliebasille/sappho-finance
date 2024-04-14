"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const CancelAddButton = () => {
  const router = useRouter();
  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button
      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      onClick={handleCancel}
    >
      X
    </button>
  );
};
