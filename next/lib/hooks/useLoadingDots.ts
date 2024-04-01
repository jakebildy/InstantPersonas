"use client";
import { useState, useEffect } from "react";

const useLoadingDots = (initialDotCount = 3, intervalTime = 500) => {
  const [loadingDots, setLoadingDots] = useState(".".repeat(initialDotCount));
  const [dotCount, setDotCount] = useState(initialDotCount);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let newDotCount = dotCount;
      if (isIncreasing && dotCount < 3) {
        newDotCount = dotCount + 1;
      } else if (!isIncreasing && dotCount > 1) {
        newDotCount = dotCount - 1;
      }

      setDotCount(newDotCount);
      setLoadingDots(".".repeat(newDotCount));

      if (newDotCount === 3 || newDotCount === 1) {
        setIsIncreasing(!isIncreasing);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [dotCount, isIncreasing, intervalTime]);

  return loadingDots;
};

export default useLoadingDots;
