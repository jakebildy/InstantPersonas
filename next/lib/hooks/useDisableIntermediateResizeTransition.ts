"use client";
import { useState, useEffect } from "react";

/**
 * Custom hook to disable transitions during window resize events, re-enabling them after a specified delay.
 * @param transitionDelay The delay in milliseconds after which transitions are re-enabled following a resize event.
 * @returns A boolean state indicating whether transitions should be allowed.
 */
export function useDisableIntermediateResizeTransition(
  transitionDelay: number,
): {
  allowTransition: boolean;
} {
  const [allowTransition, setAllowTransition] = useState<boolean>(true);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      setAllowTransition(false);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setAllowTransition(true);
      }, transitionDelay);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [transitionDelay]);

  return { allowTransition };
}
