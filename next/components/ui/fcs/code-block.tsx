"use client";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
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
        // Ensure the reference is not null
        const highlightedCode = await highlightToHtml(code);
        if (codeRef.current) {
          // Double-check to prevent errors during async operations
          codeRef.current.innerHTML = highlightedCode;
        }
      } else {
        IS_TEST_DEV_ENV &&
          console.error("The code block does not exist when trying to update.");
      }
    };

    updateCode();
  }, [code, highlighter, theme]);

  return (
    <pre
      className="group relative"
      onClick={() => (hoverToCopy ? handleCopyCode(code) : null)}
    >
      <code
        ref={codeRef}
        className={cn(
          "editor mr-2 font-light",
          hoverToCopy ? "cursor-pointer" : "",
          className,
        )}
        {...Props}
      />
      {hoverToCopy ? (
        <div className="absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center gap-2 transition-all duration-200 ease-linear group-hover:grid">
          <CopyIcon className="h-4 w-4 animate-pulse" tabIndex={0} />
          <p className="text-OffWhite/60 w-full text-center text-xs md:w-[350px]">
            Click to copy code
          </p>
        </div>
      ) : null}
    </pre>
  );
};
