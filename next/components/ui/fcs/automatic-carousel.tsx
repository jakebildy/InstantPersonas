import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState, useMemo } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  msDelay?: number;
};

export default function AutomaticCarousel({
  children,
  className,
  msDelay = 1500,
}: Props) {
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  // Use useMemo to memoize the array of children
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  useEffect(() => {
    // Setting up the interval
    const childCount = childrenArray.length; // Use childrenArray length instead of React.Children.count
    const interval = setInterval(() => {
      setCurrentChildIndex((prev) => (prev + 1) % childCount);
    }, msDelay);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [childrenArray, msDelay]); // Depend on childrenArray here

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        key={`current-carousel-item-${currentChildIndex}`}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -15, opacity: 0 }}
        transition={{ duration: 0.3, ease: "linear" }}
        className={className}
      >
        {childrenArray[currentChildIndex]}
      </motion.div>
    </AnimatePresence>
  );
}
