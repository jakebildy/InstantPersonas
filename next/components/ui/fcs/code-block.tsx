"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { highlight } from "sugar-high";
import { getHighlighter } from "shiki";
import { transformerNotationDiff } from "@shikijs/transformers";
import { ThemeZero } from "./theme-zero";
import { CopyIcon } from "@radix-ui/react-icons";
import { useHandleCopyCode } from "./handle-copy-code";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  code: string;
  theme?: "slack-ochin" | "andromeeda" | "aurora-x" | "zero";
  highlighter?: "shiki" | "sugar-high";
  hoverToCopy?: boolean;
}

export const CodeInput = ({
  code,
  className,
  theme = "zero",
  highlighter = "shiki",
  hoverToCopy = false,
  ...Props
}: Props) => {
  const codeRef = useRef<HTMLSpanElement>(null);
  const { handleCopyCode } = useHandleCopyCode();

  useEffect(() => {
    const highlightToHtml = async (code: string) => {
      if (highlighter === "sugar-high") {
        // Assuming there's another function or method to handle this case
        return await highlight(code); // Replace with actual function to highlight code
      } else if (highlighter === "shiki") {
        const highlighter = await getHighlighter({
          themes: [ThemeZero, "slack-ochin", "andromeeda", "aurora-x"],
          langs: [
            "ts",
            "json5",
            "json",
            "javascript",
            "typescript",
            "tsx",
            "jsx",
          ],
        });
        const html = await highlighter.codeToHtml(code, {
          lang: "ts",
          theme: theme,
          transformers: [transformerNotationDiff()],
        });
        return html;
      } else {
        return code;
      }
    };

    const updateCode = async () => {
      if (codeRef.current) {
        const highlightedCode = await highlightToHtml(code);
        codeRef.current.innerHTML = highlightedCode;
      }
    };

    updateCode();
  }, [code, highlighter, theme]);

  return (
    <pre
      className="relative group"
      onClick={() => (hoverToCopy ? handleCopyCode(code) : null)}
    >
      <code
        ref={codeRef}
        className={cn(
          "mr-2 font-light editor",
          hoverToCopy ? " cursor-pointer" : "",
          className
        )}
        {...Props}
      />
      {hoverToCopy ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden z-50 transition-all duration-200 ease-linear group-hover:grid place-items-center gap-2 cursor-pointer">
          <CopyIcon className="animate-pulse h-4 w-4" tabIndex={0} />
          <p className="w-full md:w-[350px] text-center text-xs text-OffWhite/60">
            Click to copy code
          </p>
        </div>
      ) : null}
    </pre>
  );
};
