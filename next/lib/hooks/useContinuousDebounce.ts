"use client";
import { useCallback, useRef } from "react";

/**
 * A custom hook to create a debounced function that can handle any type of callback.
 * @param callback The function to debounce.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced function.
 */
export function useContinuousDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFn;
}
// This debounces a callback function, which is useful for handling continuous events like scrolling or typing.
// It uses the useRef and useCallback hooks to maintain the debounced function and its associated timer.
// When continuous calls are made to the debounced function, the timer is reset, and the callback is only invoked after the delay has passed.
// The debounced function is returned for use in components.s
