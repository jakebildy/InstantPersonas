"use client";
import { useEffect, useState } from "react";
import "./tableOfContents.css";
import { useHeadsObserver } from "./tableOfContentsHook";

function TableOfContents() {
  const [headings, setHeadings] = useState<any>([]);
  const { activeId } = useHeadsObserver();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4")).map(
      (elem) => ({
        id: elem.id,
        text: elem.textContent,
        level: Number(elem.nodeName.charAt(1)),
      })
    );
    setHeadings(elements);
  }, []);

  const handleClick = (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
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
    <nav className="table-of-contents">
      <ul>
        <span className="font-bold text-xl text-black">Table of Contents</span>
        <div className="flex flex-row mt-5">
          <div className="bg-green-700 w-1 mr-5"></div>
          <div>
            {headings.map((heading: any) => (
              <li
                key={heading.id}
                style={{
                  fontWeight: activeId === heading.id ? "bold" : "normal",
                  color: activeId === heading.id ? "green" : "gray",
                }}
                className={getClassName(heading.level)}
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
