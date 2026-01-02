"use client";

import { useEffect, useState } from "react";
import { getOrCreateSessionId, getSessionId } from "@/app/core/utils/session";

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionId(id);
    setIsLoading(false);
  }, []);

  return { sessionId, isLoading };
}

export function useHasSession() {
  const [hasSession, setHasSession] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = getSessionId();
    setHasSession(id !== null);
    setIsLoading(false);
  }, []);

  return { hasSession, isLoading };
}
