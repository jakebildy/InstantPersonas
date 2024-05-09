import { cn } from "@/lib/utils";
import Link from "next/link";

type BlogPost = {
  name: string;
  slug: string;
  lead: string;
};

const BLOG_POSTS: BlogPost[] = [
  {
    name: "6 Tips to Use Business Data to Craft a Strong User Persona in 2024 (GUIDE)",
    slug: "craft-a-strong-user-persona-in-2024",
    lead: "1. Use the 80/20 Rule: Your product or service likely appeals to a bunch of different kinds of people - that’s great, but it’s important to narrow down to a specific audience.",
  },
  {
    name: "Everything You Need to Know About Topical Authority (2024)",
    slug: "topical-authority-ultimate-guide",
    lead: "Topical Authority refers to the level of expertise and credibility your site holds in a specific subject area. It's about depth and breadth of knowledge in a specific field, and how effectively you communicate that through your content.",
  },
];

export default function BlogPage() {
  return (
    <section className="bg-white ">
      <title>Instant Personas Blog | Marketing Insights</title>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 ">
            Our Blog
          </h2>
          <p className="font-light text-gray-500 sm:text-xl ">
            Dive into our comprehensive blog as we help you understand how to
            make strong user personas and get deep insights on your target
            market using data and artificial intelligence.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {BLOG_POSTS.map((post, i) => (
            <ArticleCard
              post={post}
              key={post.slug}
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

const ArticleCard = ({
  post,
  className,
}: {
  post: BlogPost;
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
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded ">
          <svg
            className="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
              clipRule="evenodd"
            />
            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
          </svg>
          Article
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
