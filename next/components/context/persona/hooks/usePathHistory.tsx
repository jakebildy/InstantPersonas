"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type PathHistory = {
  current: string;
  previous: string | null;
  history: string[];
};
/**
 * Custom hook to track the history of pathnames.
 * @returns An object containing the current, previous, and history of pathnames.
 */
export function usePathHistory(): {
  path: PathHistory;
} {
  // State to store the history of pathnames.
  const [pathHistory, setPathHistory] = useState<string[]>([]);
  const currentPathname = usePathname();

  // Get the previous pathname if it exists, otherwise null.
  const previousPathname = pathHistory.at(-2) || null;

  // Effect to update the path history state when the pathname changes.
  useEffect(() => {
    // Only update if the current pathname is different from the last recorded one.
    if (pathHistory.at(-1) !== currentPathname) {
      setPathHistory((prevHistory) => [...prevHistory, currentPathname]);
    }
  }, [currentPathname, pathHistory]);

  return {
    path: {
      current: currentPathname,
      previous: previousPathname,
      history: pathHistory,
    },
  };
}
