"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHasSession } from "@/app/core/hooks/useSession";

export function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { hasSession, isLoading } = useHasSession();

  useEffect(() => {
    if (!isLoading && !hasSession && pathname !== "/") {
      router.push("/");
    }
  }, [hasSession, isLoading, pathname, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasSession && pathname !== "/") {
    return null;
  }

  return <>{children}</>;
}
