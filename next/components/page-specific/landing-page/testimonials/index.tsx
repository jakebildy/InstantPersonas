import SparklesText from "@/components/ui/magicui/sparkles-text";
import { TestimonialCard } from "./testimonial-card";
import { TESTIMONIALS } from "./testimonials";
import { gradientVariants, shadowVariants } from "@/components/variants";
import { cx } from "class-variance-authority";

export function TestimonialSection() {
  const variant = "blue";

  return (
    <section
      id="testimonials"
      className="relative grid h-full w-full place-items-center gap-16 overflow-hidden rounded-lg pb-10"
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center font-jost">
        {/* <SparklesText
          text="Don't just take our word for it"
          className="text-3xl font-bold tracking-tight sm:text-6xl"
          sparklesCount={5}
        /> */}

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-6xl">
          Don&apos;t just take our word for it
        </h2>
        <p>
          We&apos;ve helped thousands of people understand their audience
          better. Here&apos;s what they have to say.
        </p>
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
