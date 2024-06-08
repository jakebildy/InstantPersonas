"use client";
import { useEffect } from "react";
import { useState } from "react";

function ReadingBar() {
  //Width State
  const [width, setWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", scrollHeight);
    return () => window.removeEventListener("scroll", scrollHeight);
  });

  // scroll function
  const scrollHeight = () => {
    var el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight;
    var percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100;
    // store percentage in state
    setWidth(percent);
  };
  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 bg-green-600"
      style={{ width: width + "%" }}
    ></div>
  );
}
export default ReadingBar;
