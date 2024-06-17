import { BlogPost } from "@/app/(public)/blog/page";
import { BLOG_POSTS } from "@/lib/config/blog";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ReadMore({ currentSlug }: { currentSlug: string }) {
  return (
    <div className="mt-32">
      {/* divider */}

      <div className="mx-10 mt-10 grid gap-8 lg:grid-cols-2">
        {BLOG_POSTS.reverse()
          .filter((post) => post.slug != currentSlug)
          .map((post, i) => (
            <ArticleCard
              post={post}
              key={post.slug}
              category={post.category}
              className={
                BLOG_POSTS.length % 2 !== 0 && i == BLOG_POSTS.length - 1
                  ? "lg:col-span-2"
                  : ""
              }
            />
          ))}
      </div>
    </div>
  );
}

const ArticleCard = ({
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
        "rounded-lg border border-gray-200 bg-white p-6 shadow-md",
        className,
      )}
    >
      <div className="mb-5 flex items-center justify-between text-gray-500">
        <span className="inline-flex items-center rounded-xl bg-green-200 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {category}
        </span>
      </div>
      <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        <Link href={"/blog/" + post.slug}>{post.name}</Link>
      </div>
      <p className="mb-5 font-light text-gray-500">{post.lead}</p>
      <div className="flex items-center justify-between">
        <Link
          href={"/blog/" + post.slug}
          className="text-primary-600 inline-flex items-center font-medium hover:underline"
        >
          Read more
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
    </article>
  );
};
