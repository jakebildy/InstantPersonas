import { cn } from "@/lib/utils";
import Link from "next/link";

type PracticeExam = {
  name: string;
  slug: string;
  category: string;
};

const PRACTICE_TESTS: PracticeExam[] = [
  {
    name: "Digital Marketing Associate",
    slug: "digital-marketing-associate",
    category: "Associate",
  },
  {
    name: "Community Manager",
    slug: "community-manager",
    category: "Associate",
  },
  {
    name: "Media Planning Professional",
    slug: "media-planning-professional",
    category: "Professional",
  },
  {
    name: "Media Buying Professional",
    slug: "media-buying-professional",
    category: "Professional",
  },
  {
    name: "Marketing Science Professional",
    slug: "marketing-science-professional",
    category: "Professional",
  },
  {
    name: "Creative Strategy Professional",
    slug: "creative-strategy-professional",
    category: "Professional",
  },
];

export default function MetaBlueprintPracticePage() {
  return (
    <section className="bg-white">
      <title>Free Facebook Blueprint Practice Exams</title>
      <meta
        name="description"
        content="Build your marketing knowledge with these practice exams for Meta
        Blueprint certifications. No signup needed. Don't miss these questions!"
      />
      <meta
        property="og:url"
        content="instantpersonas.com/meta-blueprint-practice-exams"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Free Facebook Blueprint Practice Exams"
      />
      <meta
        property="og:description"
        content="Build your marketing knowledge with these practice exams for Meta Blueprint certifications. Don't miss these questions!"
      />
      <meta property="og:image" content="/og/meta_blueprint.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:domain"
        content="instantpersonas.com/meta-blueprint-practice-exams"
      />
      <meta
        property="twitter:url"
        content="instantpersonas.com/meta-blueprint-practice-exams"
      />
      <meta
        name="twitter:title"
        content="Free Facebook Blueprint Practice Exams"
      />
      <meta
        name="twitter:description"
        content="Build your marketing knowledge with these practice exams for Meta Blueprint certifications. Don't miss these questions!"
      />
      <meta name="twitter:image" content="/og/meta_blueprint.png" />
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Free Practice Exams for Meta Blueprint Certifications
          </h2>
          <p className="font-light text-gray-500 sm:text-xl">
            Build your marketing knowledge with these practice exams for Meta
            Blueprint certifications. No signup needed.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {PRACTICE_TESTS.map((post, i) => (
            <ArticleCard
              post={post}
              key={post.slug}
              category={post.category}
              className={
                PRACTICE_TESTS.length % 2 !== 0 &&
                i == PRACTICE_TESTS.length - 1
                  ? "lg:col-span-2"
                  : ""
              }
            />
          ))}
        </div>
        <p className="mt-4 text-center font-light text-gray-500 sm:text-xl">
          We help you understand your target audience and market more
          succesfully.
        </p>
        <p className="mt-4 text-center font-light text-gray-500 sm:text-xl">
          Learn how to supercharge your marketing by creating detailed personas{" "}
          <a className="text-blue-600" href="https://instantpersonas.com/">
            here
          </a>
          .
        </p>

        <div className="text-center text-xs font-light text-gray-500">
          We&apos;re not associated with Meta. This is not an official exam but
          is designed to help you prepare for the real thing.
        </div>
      </div>
    </section>
  );
}

const ArticleCard = ({
  post,
  category,
  className,
}: {
  post: PracticeExam;
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
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        <Link href={"/meta-blueprint-practice-exams/" + post.slug}>
          {post.name}
        </Link>
      </h2>
      <div className="flex items-center justify-between">
        <Link
          href={"/meta-blueprint-practice-exams/" + post.slug}
          className="text-primary-600 inline-flex items-center font-medium hover:underline"
        >
          Start Practice Exam
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
