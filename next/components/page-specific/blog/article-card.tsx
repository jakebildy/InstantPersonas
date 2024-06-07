import { BlogPost } from "@/app/(public)/blog/page";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";

export const ArticleCard = ({
  post,
  category,
  className,
}: {
  post: BlogPost;
  category?: string;
  className?: string;
}) => {
  return (
    <article
      className={cn(
        "p-6 bg-white rounded-lg border border-gray-200 shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-green-200 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-xl ">
          {category}
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
        <Link href={"/blog/" + post.slug}>{post.name}</Link>
      </h2>
      <p className="mb-5 font-light text-gray-500 ">{post.lead}</p>
      <div className="flex justify-between items-center">
        <Link
          href={"blog/" + post.slug}
          className="inline-flex items-center font-medium text-primary-600  hover:underline"
        >
          Read more
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
    </article>
  );
};
