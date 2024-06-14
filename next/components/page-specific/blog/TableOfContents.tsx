"use client";
import { useEffect, useState } from "react";
import "./tableOfContents.css";
import { useHeadsObserver } from "./tableOfContentsHook";
import { cn } from "@/lib/utils";

function TableOfContents() {
  const [headings, setHeadings] = useState<any>([]);
  const { activeId } = useHeadsObserver();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (elem) => ({
        id: elem.id,
        text: elem.textContent,
        level: Number(elem.nodeName.charAt(1)),
      }),
    );
    setHeadings(elements);
  }, []);

  const handleClick = (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getClassName = (level: number) => {
    switch (level) {
      case 2:
        return "head2 text-sm";
      case 3:
        return "head3 text-sm";
      case 4:
        return "head4 text-sm";
      default:
        return undefined;
    }
  };

  return (
    <nav className="block max-h-[calc(100vh-70px)] w-full self-start overflow-auto p-4 sm:sticky sm:top-12 sm:mt-[150px] sm:w-[220px] sm:min-w-[220px]">
      <ul>
        <span className="text-xl font-bold text-black">Table of Contents</span>
        <div className="mt-5 flex flex-row">
          <div className="mr-5 w-1 bg-green-700"></div>
          <div>
            {headings.map((heading: any) => (
              <li
                key={heading.id}
                style={{
                  fontWeight: activeId === heading.id ? "bold" : "normal",
                  color: activeId === heading.id ? "green" : "gray",
                }}
                className={cn(
                  getClassName(heading.level),
                  "hover:text-green-700 hover:underline",
                )}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(heading.id, e)}
                >
                  {heading.text.includes(".")
                    ? heading.text.split(".")[1]
                    : heading.text}
                </a>
              </li>
            ))}
          </div>
        </div>
      </ul>
    </nav>
  );
}
export default TableOfContents;
