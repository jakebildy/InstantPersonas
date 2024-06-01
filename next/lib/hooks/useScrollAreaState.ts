"use client";
import { useLayoutEffect, useRef, useState } from "react";

type ScrollAreaState = {
  is: {
    atTop: boolean;
    atMiddle: boolean;
    atBottom: boolean;
  };
  percent: number;
};

export const useScrollAreaState = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<ScrollAreaState>({
    is: {
      atTop: false,
      atMiddle: false,
      atBottom: false,
    },
    percent: 0,
  });

  useLayoutEffect(() => {
    /**
     * Updates the scroll state by calculating the scroll position percentage
     * and determining whether the scroll is at the top, middle, or bottom.
     */
    const updateScrollState = () => {
      // Reference to the scrollable area
      const scrollArea = ref.current;
      if (scrollArea) {
        setState((previousState) => {
          // Retrieve the necessary scroll metrics
          const scrollTop = scrollArea.scrollTop;
          const scrollHeight = scrollArea.scrollHeight;
          const clientHeight = scrollArea.clientHeight;

          // Calculate the maximum scrollable distance, ensuring no division by zero
          const maxScrollableDistance = scrollHeight - clientHeight || 1;
          // Calculate the scroll percentage
          const scrollPercentage = Math.round(
            (scrollTop / maxScrollableDistance) * 100
          );

          // Return the updated state with the new scroll information
          return {
            ...previousState,
            is: {
              atTop: scrollPercentage === 0,
              atMiddle: scrollPercentage > 0 && scrollPercentage < 100,
              atBottom: scrollPercentage === 100,
            },
            percent: scrollPercentage,
          };
        });
      }
    };

    const scrollArea = ref.current;
    if (scrollArea) {
      scrollArea.addEventListener("scroll", updateScrollState);
    }

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });

    if (scrollArea) {
      resizeObserver.observe(scrollArea);
    }

    // Initial update
    updateScrollState();

    // Cleanup function
    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener("scroll", updateScrollState);
        resizeObserver.unobserve(scrollArea);
      }
      resizeObserver.disconnect();
    };
  }, [ref]);

  return [ref, state] as const;
};
