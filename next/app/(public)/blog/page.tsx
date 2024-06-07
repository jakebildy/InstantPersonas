import { cn } from "@/lib/utils";
import { BLOG_POSTS } from "@/lib/config/blog";
import Link from "next/link";

export type BlogPost = {
  name: string;
  slug: string;
  lead: string;
  category: string;
};

export default function BlogPage() {
  return (
    <section className="bg-white ">
      <title>InstantPersonas Blog | Marketing Insights</title>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 ">
            Understand and Reach your Audience Quickly
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            InstantPersonas helps you understand your audience better, so you
            can create more effective marketing campaigns. Here we will share
            some tips and tricks.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {BLOG_POSTS.reverse().map((post, i) => (
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
    </section>
  );
}

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
