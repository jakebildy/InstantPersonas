import { BLOG_POSTS } from "@/lib/config/blog";
import { ArticleCard } from "@/components/page-specific/blog/article-card";

export type BlogPost = {
  name: string;
  slug: string;
  lead: string;
  category: string;
};

export default function BlogPage() {
  return (
    <section className="bg-white">
      <title>InstantPersonas Blog | Marketing Insights</title>
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Understand and Reach your Audience Quickly
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
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
