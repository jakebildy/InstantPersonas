import { SEOLINK } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export const ToolPreviewCard = ({
  tool,
  category,
  className,
}: {
  tool: SEOLINK;
  category?: string;
  className?: string;
}) => {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-md",
        className,
      )}
    >
      <PersonStandingIcon className="absolute right-2 top-2 size-6 text-muted-foreground" />
      <div className="z-20 mb-5 flex items-center justify-between text-gray-500">
        <span className="inline-flex items-center rounded-xl bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {category}
        </span>
      </div>
      <h2 className="z-20 mb-2 flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
        <Link href={tool.href}>{tool.title}</Link>
      </h2>
      <p className="z-20 mb-5 font-light text-gray-500">{tool.lead}</p>
      <div className="z-20 flex items-center justify-between">
        <Link
          href={tool.href}
          className="text-primary-600 z-20 inline-flex items-center font-medium hover:underline"
        >
          Try it now
          <svg
            className="ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <tool.icon className="absolute bottom-0 right-14 z-0 size-[200px] translate-x-10 translate-y-1/4 text-gray-500/10" />
    </article>
  );
};
