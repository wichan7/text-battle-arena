"use client";

import type { PropsWithChildren } from "react";
import AuthGuard from "@/core/client/auth/AuthGuard";
import { QueryProvider } from "@/queries/QueryProvider";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <AuthGuard>
      <QueryProvider>{children}</QueryProvider>
    </AuthGuard>
  );
};

export default ClientLayout;
