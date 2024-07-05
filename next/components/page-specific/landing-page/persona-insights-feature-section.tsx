import { Button } from "@/components/ui/button";
import { IconVariants } from "@/components/ui/gradient-button";
import {
  background600,
  ButtonInnerHover,
  gradientLightVariants,
  SVGLight600,
  avatarVariants,
  ColorVariant,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import { CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cx } from "class-variance-authority";
import {
  GraduationCapIcon,
  BarChart4Icon,
  BookOpenCheckIcon,
  PersonStandingIcon,
  MessageCircleQuestionIcon,
  LightbulbIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import useMeasure from "react-use-measure";
import Image from "next/image";
import * as InsightFeatureImage from "@/public/instant_personas_insight_feature.png";
import { PersonaAvatarPopover } from "@/components/persona-archetype-generic/persona-avatar-popover";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";

type Props = {
  variant?: ColorVariant;
};

export default function PersonaInsightsFeatureSection({
  variant = "blue",
}: Props) {
  const [personaThoughts, setPersonaThoughts] = useState<
    {
      personaInterested: string;
      // searchIntent: string;
      thought: string;
      action: string;
      persona: PersonaBusinessArchetype;
    }[]
  >([
    {
      personaInterested: "YES",
      thought:
        "🙂~I want to learn more about meditation and how it can help me.",
      action: "Downloads app",
      persona: {
        archetype_name: "Sustainable Sophie",
        business: {
          target_problem: "High price points of eco-friendly products.",
          description: "Eco-conscious consumers who value style and quality.",
        },
        pictureURL:
          "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=variant07&hair=variant39&backgroundColor=ef9796",
        persona_components: {
          Motivations:
            "Desire to live sustainably without compromising on style or quality.",
          Painpoints: "High price points of eco-friendly products.",
          Preferences_and_Needs:
            "Eco-friendly products that are both aesthetically pleasing and competitively priced.",
          End_Goal:
            "To curate a home that aligns closely with her ethical and environmental values.",
          Mindset_and_Perspective:
            "Optimistic about the possibility of a sustainable future, values transparency and authenticity from brands.",
        },
        insights: {
          Enhanced_Interaction_Patterns:
            "Frequent engagement via Instagram and Pinterest, responsive to influencer promotions and educational content about sustainability.",
          Strategic_Recommendations:
            "Introduce a loyalty program that rewards eco-friendly purchases with discounts. Engage with micro-influencers who emphasize cost-effective sustainable living.",
        },
      },
    },
  ]);

  return (
    <>
      <section
        id="feature-1"
        className="relative flex w-full flex-1 flex-col justify-between gap-10 md:mb-0"
      >
        <div
          className={background600({
            variant,
            className:
              "absolute right-0 top-0 size-[50vw] opacity-25 blur-[100px]",
          })}
        />

        <div
          className={background600({
            variant,
            className:
              "absolute -left-10 bottom-0 size-[15vw] opacity-25 blur-3xl",
          })}
        />
        <div className="z-20 flex gap-2 text-center font-jost sm:text-left">
          <div className="hidden flex-col items-center justify-start sm:flex">
            <LightbulbIcon className="size-[1.5rem] sm:size-[1.75rem]" />
          </div>
          <div className="flex max-w-[800px] flex-col gap-2 md:gap-4">
            <span className="text-base font-semibold sm:text-lg lg:text-xl">
              Once you make your personas, get insights into their thoughts
            </span>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-6xl">
              Put your personas to work
            </h3>
            <span className="sm:w-[300px] lg:text-lg">
              See how any website would be perceived by your personas. You can
              try it right now - here are personas for a meditation app.
            </span>
            <br className="max-md:hidden" />
            <ul className="flex flex-col gap-1 max-md:pt-4 sm:w-[300px] lg:gap-2">
              <li className="flex items-center gap-4">
                <GraduationCapIcon className="size-4 lg:size-6" />
                <span className="lg:text-lg">
                  Understand your audience better
                </span>
              </li>
              <li className="flex items-center gap-4">
                <PersonStandingIcon className="size-4 lg:size-6" />
                <span className="lg:text-lg">
                  Optimize your funnel to target the right persona
                </span>
              </li>
              <li className="flex items-center gap-4">
                <BarChart4Icon className="size-4 lg:size-6" />
                <span className="lg:text-lg">
                  Discover which personas your competitors are targeting
                </span>
              </li>
              <Button
                variant={"outline"}
                className={cn(
                  "group mt-4 h-fit rounded-full p-1 shadow-md hover:scale-100 hover:text-primary",
                  "z-20",
                )}
              >
                <span
                  className={cx(
                    ButtonInnerHover({ variant: variant }),
                    cn(
                      "flex w-full items-center justify-center gap-2 pl-5 text-sm",
                      "bg-gradient-to-b from-blue-500 to-blue-500 text-white hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-400",
                    ),
                  )}
                >
                  <Link href="/register">Join InstantPersonas for Free</Link>
                  <PersonStandingIcon
                    className={IconVariants({
                      size: "sm",
                      className: "text-white",
                    })}
                  />
                </span>
              </Button>
            </ul>
          </div>
        </div>

        <div
          className={cn(
            "md:absolute md:right-0 md:top-[40%] md:size-[65%] lg:top-[35%] lg:size-[68%] xl:top-[30%] xl:size-[75%]",
            "flex items-center md:items-start md:justify-end",
            "transition-all duration-700 ease-out",
          )}
        >
          <div className="relative aspect-[2048/1279] w-full md:w-[90%]">
            <div className="absolute left-[16%] top-[14%] z-10 flex h-full w-[53%] flex-col items-center rounded-lg border bg-white p-1 shadow-xl">
              hello
            </div>

            <div className="relative left-[593px] top-[50px] z-40 h-[498px] w-64 scale-90 rounded-sm border-[1px] border-gray-200 bg-white">
              {/* PersonaThoughts */}
              {personaThoughts.map((thought, i) => (
                <div>
                  <div key={i} className="flex flex-row p-2">
                    <div
                      className={
                        thought.personaInterested.trim() !== "YES"
                          ? "opacity-50"
                          : "z-50"
                      }
                    >
                      <PersonaAvatarPopover
                        allowManage={false}
                        {...{
                          archetype: thought.persona,
                          variant: mapUrlBackgroundColorParamToVariant({
                            url: thought.persona.pictureURL,
                          }),
                        }}
                        size={"sm"}
                      />
                      <div className="relative left-[40px] top-[-20px] text-lg">
                        {thought.personaInterested.trim() !== "YES"
                          ? "🚫"
                          : thought.thought.split("~")[0]}
                      </div>
                    </div>

                    {thought.personaInterested.trim() !== "YES" ? (
                      <div className="ml-2 mt-2 text-xs font-bold text-gray-400">
                        {thought.persona.archetype_name} may not be interested
                        in this based on the title and description on Google -{" "}
                        {thought.personaInterested}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center whitespace-pre-wrap px-2 text-sm">
                        {/* <div className="mb-2 flex flex-row text-xs font-bold text-gray-500">
                          🔍 {thought.searchIntent}
                        </div> */}
                        <div className="rounded-lg bg-gray-200 p-2">
                          {thought.thought.split("~")[1]}
                        </div>
                        <div className="mb-4 mt-2 text-xs font-bold text-green-500">
                          -&gt; {thought.persona.archetype_name}{" "}
                          {thought.action}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="h-[2px] w-full bg-gray-100" />
                </div>
              ))}
            </div>

            <Image
              fill={true}
              src={InsightFeatureImage}
              alt="Instant Personas Blog with Real Time Insights"
              className="overflow-hidden rounded-lg border shadow-lg"
            />
          </div>
        </div>
      </section>
      <div className="aspect-[2048/1279] w-1/3 md:w-1/4 lg:w-1/3 min-[1550px]:w-2/3" />
    </>
  );
}
