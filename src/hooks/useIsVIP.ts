"use client";

import { useSession } from "next-auth/react";

export function useIsVIP() {
  const { data: session, status } = useSession();

  return {
    isVIP: session?.isVIP ?? false,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    session,
  };
}
