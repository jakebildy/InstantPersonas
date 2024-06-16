import { Container } from "@/components/page-specific/landing-page/container";
import { PersonaAvatarPopover } from "@/components/persona-archetype-generic/persona-avatar-popover";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { AnimatedTooltip } from "@/components/ui/aceternity/animated_tooltip";
import { HoverEffect } from "@/components/ui/aceternity/card_hover_effect";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { avatarVariants } from "@/components/variants";

export default function FeaturesSection() {
  return (
    <section
      id="product-features"
      className="relative bg-white py-32 text-center"
    >
      <h2 className="pt-20 text-base font-semibold leading-7 text-green-600">
        Features
      </h2>
      <h2 className="font-display mb-10 text-5xl font-bold tracking-tight text-black">
        Personas ask questions while you write
      </h2>
      <p className="mx-auto mb-5 mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
        Once you create your personas, they provide you with insights whenever
        you write content. They ask questions, suggest topics and help you
        optimize your content for SEO.
      </p>
      <div className="mx-auto flex max-w-5xl flex-col px-8 sm:flex-row">
        <div className="xs:w-[80%] hidden h-[700px] w-[500px] p-2 pt-10 text-center shadow-lg sm:block sm:w-[80%]">
          <span className="font-jost text-2xl font-bold">
            Guide to Instagram Marketing
          </span>
          <div className="mx-auto mb-5 mt-10 h-2 w-[80%] rounded-full bg-gray-200"></div>
          <div className="mx-auto mb-5 h-2 w-[80%] rounded-full bg-gray-200"></div>{" "}
          <div className="mx-auto mb-5 h-2 w-[80%] rounded-full bg-gray-200"></div>{" "}
          <div className="mx-auto mb-5 h-2 w-[80%] rounded-full bg-gray-200"></div>
          <br></br> <br></br> <br></br>
          <div className="mx-auto mb-5 h-2 w-[80%] rounded-full bg-gray-200"></div>
          <div className="mx-auto mb-5 h-2 w-[80%] rounded-full bg-gray-200"></div>{" "}
          <div className="mx-auto mb-5 h-2 w-[80%] rounded-full bg-gray-200"></div>{" "}
          <div className="mx-auto mb-5 h-2 w-[80%] rounded-full bg-gray-200"></div>
        </div>
        <div className="sm:ml-10">
          <div className="flex flex-row p-2">
            <Avatar
              className={avatarVariants({
                variant: "brown",
                interactive: true,
              })}
            >
              <AvatarImage
                src={
                  "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant14&hair=variant46&backgroundColor=e6d3d0"
                }
              />
            </Avatar>

            <div className="mt-2 flex w-[200px] items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-left text-sm">
              {
                "My ecommerce brand targets an older audience, would Instagram marketing still make sense?"
              }
            </div>
          </div>

          <div className="mt-10 flex flex-row p-2">
            <Avatar
              className={avatarVariants({
                variant: "purple",
                interactive: true,
              })}
            >
              <AvatarImage
                src={
                  "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc"
                }
              />
            </Avatar>

            <div className="mt-2 flex w-[200px] items-center whitespace-pre-wrap rounded-lg bg-gray-200 p-2 px-4 text-left text-sm">
              {
                "I already have a lot on my plate.\nHow much time do I need to spend doing Instagram marketing every day?"
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
