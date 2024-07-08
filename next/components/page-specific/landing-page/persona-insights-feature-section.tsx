import { Button } from "@/components/ui/button";
import { IconVariants } from "@/components/ui/gradient-button";
import {
  background600,
  ButtonInnerHover,
  ColorVariant,
} from "@/components/variants";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";
import {
  GraduationCapIcon,
  BarChart4Icon,
  PersonStandingIcon,
  LightbulbIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import * as InsightFeatureImage from "@/public/instant_personas_insight_feature.png";
import { PersonaAvatarPopover } from "@/components/persona-archetype-generic/persona-avatar-popover";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { PersonaBusinessArchetype } from "@/components/toolfolio/selected-personas/types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  variant?: ColorVariant;
};

export default function PersonaInsightsFeatureSection({
  variant = "blue",
}: Props) {
  const MINDFUL_MAX = {
    id: "mindful-max",
    archetype_name: "Mindful Max",
    business: {
      target_problem: "High price points of eco-friendly products.",
      description: "Eco-conscious consumers who value style and quality.",
    },
    pictureURL:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant07&hair=variant13&backgroundColor=d9cbfc&glassesProbability=100&glasses=variant08",
    persona_components: {
      Motivations:
        "Seeking a structured, engaging way to de-stress and regain focus during busy periods.",
      Painpoints:
        "Difficulty sticking with a meditation routine due to a busy lifestyle and finding meditation monotonous.",
      Preferences_and_Needs:
        "Prefers quick, guided sessions with interactive and fun elements that can fit into a hectic schedule.",
      End_Goal:
        "To build a regular, enjoyable meditation practice that promotes sustainable stress relief and focus.",
      Mindset_and_Perspective:
        "Pragmatic and results-oriented, looking for efficient solutions.",
    },
    insights: {
      Enhanced_Interaction_Patterns:
        "Uses the app primarily during breaks at work or in the evenings. Enjoys unlocking achievements and sharing milestones with peers.",
      Strategic_Recommendations:
        "Enhance bite-sized, guided meditations, increase notifications for short breaks, and expand achievements related to streaks for motivation.",
    },
  };

  const SOCIAL_SOPHIA = {
    id: "social-sophia",
    archetype_name: "Social Sophia",
    business: {
      target_problem: "",
      description: "",
    },
    pictureURL:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant02&hair=variant39&backgroundColor=ef9796&glassesProbability=100&glasses=variant11",
    persona_components: {
      Motivations:
        "To connect with friends and family on a wellness platform, sharing progress and motivating each other.",
      Painpoints:
        "Feels isolated in her meditation journey and lacks support and motivation from peers.",
      Preferences_and_Needs:
        "Strong preference for social features, likes to engage in challenges and share updates.",
      End_Goal:
        "Create a supportive community environment within the app to maintain a regular meditation practice.",
      Mindset_and_Perspective:
        "Community-focused and collaborative, values connections.",
    },
    insights: {
      Enhanced_Interaction_Patterns:
        "Frequently uses social features, competitive in challenges, shares progress daily.",
      Strategic_Recommendations:
        "Develop more robust group challenges, facilitate easier sharing of progress on social media, and introduce friend referral programs.",
    },
  };

  const GAMER_GABBY = {
    id: "gamer-gabby",
    archetype_name: "Gamer Gabby",
    business: {
      target_problem: "",
      description: "",
    },
    pictureURL:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant23&hair=variant60&backgroundColor=fbe8b1",
    persona_components: {
      Motivations:
        "Taps into competitive spirit to build meditation habit; enjoys gamified experiences similar to video games.",
      Painpoints:
        "Quickly loses interest if the activity lacks excitement or challenge.",
      Preferences_and_Needs:
        "Needs constant stimulation and rewards, loves leaderboard rankings and unique collectibles.",
      End_Goal:
        "Stay consistently engaged and challenged by the meditation process while achieving high scores.",
      Mindset_and_Perspective:
        "Competitive and achievement-oriented, seeks fun and novelty.",
    },
    insights: {
      Enhanced_Interaction_Patterns:
        "Engages deeply with leveling systems and reward tiers; often checks leaderboards and achievements section.",
      Strategic_Recommendations:
        "Implement more complex reward systems, introduce rare achievements for consistency, and frequently update collectible items to maintain interest.",
    },
  };

  const CALM_CLARA = {
    id: "calm-clara",
    archetype_name: "Calm Clara",
    business: {
      target_problem: "",
      description: "",
    },
    pictureURL:
      "https://api.dicebear.com/8.x/notionists/svg?body=variant14&hair=variant46&backgroundColor=c7eaf1",
    persona_components: {
      Motivations:
        "Searches for tranquility and a heightened sense of mindfulness through meditation.",
      Painpoints:
        "Struggles with apps that are too busy or distracting, prefers simplicity and serenity.",
      Preferences_and_Needs:
        "Prefers minimalistic designs and straightforward, unobtrusive guidance in meditations.",
      End_Goal:
        "Achieve deep, uninterrupted meditation sessions that effectively reduce stress and enhance overall wellbeing.",
      Mindset_and_Perspective:
        "Inward-looking, values inner peace and simplicity.",
    },
    insights: {
      Enhanced_Interaction_Patterns:
        "Primarily uses the app in a quiet, secluded setting; avoids overly complex features.",
      Strategic_Recommendations:
        "Offer a 'zen mode' that minimizes gamification elements for a more traditional meditation experience and ensure a clutter-free user interface.",
    },
  };

  const [selectedLink, setSelectedLink] = useState<string>(
    "https://shellevate.app",
  );

  const SHELLEVATE_THOUGHTS = [
    {
      personaInterested: "YES",
      thought:
        "🙂~This app seems to fit my hectic schedule perfectly by offering a structured and engaging way to maintain a meditation routine!",
      action: "downloads the app",
      persona: MINDFUL_MAX,
    },
    {
      personaInterested: "YES",
      thought:
        "🙂~I love that I can connect and compete with friends while we motivate each other on this wellness platform!",
      action: "goes to add friends",
      persona: SOCIAL_SOPHIA,
    },
    {
      personaInterested: "YES",
      thought:
        "😃~The gamified elements and rewards system look really exciting and seem to perfectly align with what keeps me engaged!",
      action: "starts first meditation session",
      persona: GAMER_GABBY,
    },
    {
      personaInterested: "too busy or distracting",
      thought: "",
      action: "downloads the app",
      persona: CALM_CLARA,
    },
  ];

  const CALM_THOUGHTS = [
    {
      personaInterested: "YES",
      thought:
        "🙂~This site seems efficient with quick meditation options tailored to my busy schedule.",
      action: "explores the ‘Quick Meditations’ section",
      persona: MINDFUL_MAX,
    },
    {
      personaInterested: "lacks described social features",
      thought: "",
      action: "",
      persona: SOCIAL_SOPHIA,
    },
    {
      personaInterested: "not clearly fun or engaging enough",
      thought: "",
      action: "",
      persona: GAMER_GABBY,
    },
    {
      personaInterested: "YES",
      thought:
        "🙂~The minimalistic design and straightforward guidance are exactly what I need.",
      action: "starts a meditation session",
      persona: CALM_CLARA,
    },
  ];

  const HEADSPACE_THOUGHTS = [
    {
      personaInterested: "YES",
      thought:
        "🙂~The quick guided sessions are exactly what I need to fit meditation into my busy day!",
      action: "explores the guided meditations section",
      persona: MINDFUL_MAX,
    },
    {
      personaInterested: "doesn't solve my problem",
      thought: "",
      action: "",
      persona: SOCIAL_SOPHIA,
    },
    {
      personaInterested: "YES",
      thought:
        "🙂~Love the simplicity and focus on tranquility, perfect for my meditation style.",
      action: "engages with a deep meditation session",
      persona: CALM_CLARA,
    },
    {
      personaInterested: "doesn't solve my problem",
      thought: "",
      action: "",
      persona: GAMER_GABBY,
    },
  ];

  const [personaThoughts, setPersonaThoughts] = useState<
    {
      personaInterested: string;
      // searchIntent: string;
      thought: string;
      action: string;
      persona: PersonaBusinessArchetype;
    }[]
  >(SHELLEVATE_THOUGHTS);

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
              Once you make your personas...
            </span>
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-6xl">
              Get insights into their thoughts
            </h3>
            <span className="sm:w-[300px] lg:text-lg">
              See how any website would be perceived by your personas.
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
        {/* div when md or smaller, height is 3000px otherwise 0px */}
        <div className="h-[600px] w-full max-md:hidden lg:hidden" />
        <div
          className={cn(
            "max-md:hidden sm:hidden md:absolute md:left-[40px] md:top-[50%] md:block md:size-[100%] lg:left-[30%] lg:right-0 lg:top-[50%] lg:size-[68%] xl:top-[30%] xl:size-[75%]",
            "flex items-center md:items-start md:justify-end",
            "transition-all duration-700 ease-out",
          )}
        >
          <div className="relative aspect-[2048/1279] w-full max-w-[850px] md:w-[90%]">
            <div className="absolute left-[19%] top-[14%] z-20 flex h-full w-[53%] flex-col items-center rounded-lg border bg-white p-1 shadow-xl">
              <div
                onClick={() => {
                  setSelectedLink("https://shellevate.app");
                  setPersonaThoughts(SHELLEVATE_THOUGHTS);
                }}
                className={
                  selectedLink === "https://shellevate.app"
                    ? "relative z-30 flex w-full flex-row justify-between rounded-md border-2 border-green-600 bg-white p-2 hover:bg-green-600 hover:text-white md:text-xs lg:text-[14px]"
                    : "relative z-30 flex w-full flex-row justify-between rounded-md border-2 border-white bg-white p-2 hover:bg-green-600 hover:text-white md:text-xs lg:text-[14px]"
                }
              >
                https://shellevate.app
                <div className="flex flex-row font-jost md:text-xs lg:text-[14px]">
                  Insights
                  <div className="ml-2 h-6 w-6 rounded-md bg-white pl-1 text-green-600">
                    →
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setSelectedLink("https://calm.com");
                  setPersonaThoughts(CALM_THOUGHTS);
                }}
                className={
                  selectedLink === "https://calm.com"
                    ? "relative z-30 flex w-full flex-row justify-between rounded-md border-2 border-green-600 bg-white p-2 hover:bg-green-600 hover:text-white md:text-xs lg:text-[14px]"
                    : "relative z-30 flex w-full flex-row justify-between rounded-md border-2 border-white bg-white p-2 hover:bg-green-600 hover:text-white md:text-xs lg:text-[14px]"
                }
              >
                https://calm.com
                <div className="flex flex-row font-jost md:text-xs lg:text-[14px]">
                  Insights
                  <div className="ml-2 h-6 w-6 rounded-md bg-white pl-1 text-green-600">
                    →
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setSelectedLink("https://headspace.app");
                  setPersonaThoughts(HEADSPACE_THOUGHTS);
                }}
                className={
                  selectedLink === "https://headspace.app"
                    ? "relative z-30 flex w-full flex-row justify-between rounded-md border-2 border-green-600 bg-white p-2 hover:bg-green-600 hover:text-white md:text-xs lg:text-[14px]"
                    : "relative z-30 flex w-full flex-row justify-between rounded-md border-2 border-white bg-white p-2 hover:bg-green-600 hover:text-white md:text-xs lg:text-[14px]"
                }
              >
                https://headspace.com
                <div className="flex flex-row font-jost md:text-xs lg:text-[14px]">
                  Insights
                  <div className="ml-2 h-6 w-6 rounded-md bg-white pl-1 text-green-600">
                    →
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://i.imgur.com/lprrmW7.png"
              className="absolute bottom-[96%] left-[35%] z-50 h-[200px]"
            />
            <div className="relative left-[71%] top-[50px] z-40 h-[498px] w-64 scale-90 rounded-sm border-[1px] border-gray-200 bg-white">
              <ScrollArea className="z-50 order-1 h-[490px] w-full overflow-hidden rounded-md bg-white p-2 text-xs text-black/70 transition-all duration-200 ease-out peer-hover:opacity-25 lg:max-w-none">
                {/* PersonaThoughts */}
                {personaThoughts.map((thought, i) => (
                  <div key={i}>
                    <div className="flex flex-row p-2">
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
                <ScrollBar />
              </ScrollArea>
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
