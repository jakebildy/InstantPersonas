"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  avatarVariants,
  Border600,
  ButtonInnerHover,
  ColorVariant,
  ColorVariantMap,
  gradientLightVariants,
  textColorVariants,
} from "@/components/variants";
import { cn, timeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Testimonial } from "./testimonials";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const variantIndex = Math.floor(
    Math.random() * Object.keys(ColorVariantMap).length,
  );
  const variant = Object.keys(ColorVariantMap).at(variantIndex) as ColorVariant;
  const router = useRouter();

  return (
    <div className="h-full rounded-lg bg-white">
      <div
        className={cx(
          gradientLightVariants({
            variant: variant,
            className:
              "flex h-full w-full cursor-pointer flex-col justify-between gap-2 rounded-lg border bg-opacity-80 p-4 font-jost shadow-lg backdrop-blur-lg",
          }),
          Border600({
            variant,
            className:
              "border-opacity-10 transition-all duration-200 ease-out hover:border-opacity-50 sm:min-w-[300px]",
          }),
        )}
        onClick={() => router.push(testimonial.link)}
      >
        <div className="flex items-center justify-between gap-2">
          <Link href={testimonial.user.link || testimonial.link}>
            <Avatar
              className={avatarVariants({
                variant,
                interactive: true,
              })}
            >
              <AvatarImage
                src={testimonial.user.avatar}
                alt={[
                  testimonial.user.name.first.toLocaleLowerCase(),
                  "persona avatar",
                ].join(" ")}
              />
              <AvatarFallback>
                {testimonial.user.name.first.slice(0, 1) +
                  (testimonial.user.name.last
                    ? testimonial.user.name.last.slice(0, 1)
                    : "")}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-1 flex-col">
            <span
              className={textColorVariants({
                variant: variant,
                className: "text-lg font-bold",
              })}
            >
              {testimonial.user.name.first} {testimonial.user.name.last}
            </span>
            <Link
              href={testimonial.user.link || testimonial.link}
              className={cn(
                buttonVariants({
                  variant: "outline",
                }),
                "group h-fit w-fit rounded-full p-0.5 shadow-md hover:scale-100 hover:text-primary",
              )}
            >
              <span
                className={cx(
                  ButtonInnerHover({ variant }),
                  gradientLightVariants({
                    variant: variant,
                    className: cn(
                      "flex h-6 min-w-0 items-center gap-2 whitespace-nowrap rounded-2xl p-0.5 px-2 text-[10px]",
                    ),
                  }),
                )}
              >
                {testimonial.user.at}
              </span>
            </Link>
          </div>
          <div className="flex h-full items-start justify-center">
            <testimonial.platform.logo className="size-6" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <StarFilledIcon key={index} className="h-4 w-4 text-yellow-400" />
            ))}
          </div>
          <div>
            {testimonial.user.description ? (
              <span
                className={textColorVariants({
                  variant: variant,
                  className: "text-xs",
                })}
              >
                {testimonial.user.description}
              </span>
            ) : null}
          </div>

          <p
            className={textColorVariants({
              variant: variant,
              className: "text-opacity-90",
            })}
          >
            {testimonial.text}
          </p>
        </div>

        <div
          className={textColorVariants({
            variant: variant,
            className: "mt-2 flex w-full justify-between",
          })}
        >
          <time
            className="text-xs opacity-50"
            dateTime={new Date(testimonial.date).toISOString()}
          >
            {timeAgo(new Date(testimonial.date))}
          </time>
          {testimonial.isTruncated ? (
            <Link
              href={testimonial.link}
              className="text-xs opacity-25 transition-all duration-150 ease-out hover:underline hover:opacity-50"
            >
              Review truncated - View Original
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
