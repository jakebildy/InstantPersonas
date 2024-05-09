import { ArticleCard, BLOG_POSTS } from "@/app/(public)/blog/page";

export function ReadMore({ currentSlug }: { currentSlug: string }) {
  return (
    <div className=" mt-32">
      {/* divider */}

      <div className="grid gap-8 lg:grid-cols-2 mx-10 mt-10">
        {BLOG_POSTS.filter((post) => post.slug != currentSlug).map(
          (post, i) => (
            <div>
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
            </div>
          )
        )}
      </div>
    </div>
  );
}
