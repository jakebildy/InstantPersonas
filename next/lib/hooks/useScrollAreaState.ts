"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
    const updateScrollState = () => {
      const scrollArea = ref.current;
      if (scrollArea) {
        setState((prevState) => {
          const scrollTop = scrollArea.scrollTop;
          const scrollHeight = scrollArea.scrollHeight;
          const clientHeight = scrollArea.clientHeight;

          const percent = Math.round(
            (scrollTop / (scrollHeight - clientHeight)) * 100
          );

          return {
            ...prevState,
            is: {
              atTop: percent === 0,
              atMiddle: percent > 0 && percent < 100,
              atBottom: percent === 100,
            },
            percent,
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

  useEffect(() => {
    console.log("Scroll Area State", state);
  }, [state]);

  return [ref, state] as const;
};
