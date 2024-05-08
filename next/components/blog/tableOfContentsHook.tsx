import { useEffect, useState, useRef } from "react";

export function useHeadsObserver() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "0% 0% -55% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    if (observer.current) {
      elements.forEach((elem) => observer.current!.observe(elem));
    }
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
