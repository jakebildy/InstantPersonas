"use client";

import { IS_TEST_DEV_ENV } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LOG_ON_DEV = IS_TEST_DEV_ENV;

function logOnDev(message: string, ...optionalParams: any[]) {
  if (LOG_ON_DEV) {
    console.log(`DEV-PIDM: ${message}`, ...optionalParams);
  }
}

/**
 * Custom hook to manage and persist the chat ID from the URL pathname.
 */
export function usePersistedIDManager() {
  const [chatId, setChatId] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Extract chatId from pathname if it matches /persona/:chatId
    const match = pathname.match(/^\/persona\/(\w+)/);
    if (match) {
      const pathnameID = match[1];
      if (pathnameID) {
        setChatId(pathnameID);
        logOnDev("UE1: Persisted chatId", pathnameID);
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Handle redirection to ensure active chatId matches the route
    if (pathname === "/persona" && chatId) {
      const pathnameWithID = `/persona/${chatId}`;
      if (pathname !== pathnameWithID) {
        logOnDev("UE2: Redirecting to chat with id", chatId);
        router.replace(pathnameWithID);
      }
    } else if (pathname === "/persona" && chatId === null) {
      logOnDev("UE2: Redirecting to /persona");
      router.replace(`/persona`);
    }
  }, [pathname, chatId, router]);

  return {
    chatId,
    setChatId,
  };
}
