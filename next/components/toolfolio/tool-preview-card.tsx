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
        "p-6 bg-white rounded-lg border border-gray-200 shadow-md relative overflow-hidden",
        className
      )}
    >
      <PersonStandingIcon className="size-6 absolute top-2 right-2 text-muted-foreground" />
      <div className="flex justify-between items-center mb-5 text-gray-500 z-20">
        <span className="bg-green-200 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-xl ">
          {category}
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex gap-2 items-center z-20">
        <Link href={tool.href}>{tool.title}</Link>
      </h2>
      <p className="mb-5 font-light text-gray-500 z-20">{tool.lead}</p>
      <div className="flex justify-between items-center z-20">
        <Link
          href={tool.href}
          className="inline-flex items-center font-medium text-primary-600  hover:underline z-20"
        >
          Try it now
          <svg
            className="ml-2 w-4 h-4"
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
      <tool.icon className="absolute size-[200px] left-0 bottom-0 -translate-x-10 translate-y-1/4 text-gray-500/10 z-0" />
    </article>
  );
};
