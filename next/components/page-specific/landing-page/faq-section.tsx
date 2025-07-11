import { BackgroundGradient } from "@/components/ui/aceternity/card_background_gradient";
import { Container } from "./container";
import { BackgroundGradientAnimation } from "@/components/ui/aceternity/gradient_background";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  avatarVariants,
  gradientLightVariants,
  gradientVariants,
} from "@/components/variants";
import { GradientButton } from "@/components/ui/gradient-button";
import { SlackIcon } from "lucide-react";
import Link from "next/link";
import Ripple from "@/components/ui/magicui/ripple";
import { SLACK_INVITE_LINK } from "@/lib/site";

const faqs = [
  {
    question: "Why not just use ChatGPT?",

    answer:
      "Asking ChatGPT to create a persona for you won’t provide you with anything valuable. Why? Because ChatGPT simply does not understand your business well enough to be useful. Instead of you asking ChatGPT, InstantPersonas asks YOU. \n\nIt won’t make you a persona until it thinks it knows enough to actually provide you with meaningful insights. It also doesn’t just make one, it has enough insight into customer psychology to create four different archetypes representing the different customer types you have. \n\nOnce it creates your personas, it integrates into live data from Google Search, Meta and other platforms to provide you with tools to actually reach these people. \n\nThis is not just a simple ChatGPT wrapper like so many other AI tools out there.",
  },
  {
    question: "Can I customize the personas after the AI generates it?",
    answer:
      "Yep! You can easily change the text and download it after. You can also change them simply by talking to our AI. Good personas should be adjusted as you learn more, so we've built our tool specifically with this in mind.",
  },
  // {
  //   question: "What if I need help with InstantPersonas?",
  //   answer:
  //     "If you have any questions or issues with InstantPersonas.com, our support team is available to assist you. Simply click Send Feedback when logged in and we'll get back to you as soon as possible. We're also happy to hop on a call and help with onboarding if you need it.",
  // },
  // {
  //   question: "How can I provide feedback or suggestions for InstantPersonas?",
  //   answer:
  //     "We love hearing from our users and welcome any feedback or suggestions for improving our platform. You can provide suggestions by clicking Send Feedback when logged in.",
  // },
  {
    question: "How can InstantPersonas boost my SEO?",
    answer:
      "InstantPersonas can help you understand your target market better, which can help you create more targeted content. We provide a ton of SEO tools that your personas integrate with, like our Google keyword finder, our Guest Post Finder (for securing backlinks), and our Topical Authority Map Generator (for finding content gaps).",
  },
  {
    question: "How does InstantPersonas save me time?",
    answer:
      "InstantPersonas uses AI-powered technology to instantly generate User Personas. Just by talking to our AI, you're able to figure out gaps in your understanding of your target market, and adjust accordingly. You're also able to connect these personas to our SEO and marketing tools to reach your audience faster.",
  },
  // {
  //   question: "Can I become an affiliate?",
  //   answer: "Reach out to jacob@instantpersonas.com and we can chat.",
  // },
  {
    question: "Where is InstantPersonas going? What’s the vision?",
    answer:
      "We want to democratize marketing. As the industry's giants continually refine their strategies, it's becoming increasingly hard for smaller players to compete. Small businesses and marketing agencies often find themselves at the mercy of Big Tech's ever-changing landscape.\n\n This makes it harder to make something new, or start a business, or help others market.\n\n Marketing as a small business or marketing agency should feel doable. It should be straightforward. And you know what? Marketing should be fun. \n\nWe believe that by democratizing marketing, we can create a more meritocratic world where smaller companies with excellent products can gain the exposure they deserve. \n\nThanks for being part of our journey!",
  },
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="flex h-full flex-col bg-white"
    >
      <Container className="mt-20 h-full w-screen text-center">
        <div className="mx-auto">
          <h2
            id="faq-title"
            className="text-4xl font-bold tracking-tight text-black sm:text-5xl"
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto flex flex-auto justify-center">
          <Accordion.Root
            className="w-[800px] rounded-md shadow-black/5"
            type="single"
            // defaultValue="item-0"
            collapsible
          >
            {faqs.map((faq, faqIndex) => (
              <AccordionItem
                className="AccordionItem"
                value={"item-" + faqIndex}
                key={faqIndex}
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 w-full text-center">
                      {paragraph}
                    </p>
                  ))}
                </AccordionContent>
                <div className="h-0.5 w-full border-none bg-gray-100" />
              </AccordionItem>
            ))}
          </Accordion.Root>
        </div>
      </Container>

      <div className="z-30 h-full font-jost">
        <div className="mx-auto max-w-screen-md rounded-md border bg-white p-2 shadow-lg">
          <div
            className={gradientVariants({
              variant: "green",
              className:
                "relative mx-auto flex flex-col gap-2 overflow-hidden rounded-md text-center sm:gap-4",
            })}
          >
            <div className="z-10 mx-auto flex flex-row justify-center p-2 sm:p-5">
              <Avatar
                className={avatarVariants({
                  variant: "green",
                  interactive: true,
                })}
              >
                <AvatarImage src={"https://i.imgur.com/WZG9K4h.png"} />
              </Avatar>
              <Avatar
                className={avatarVariants({
                  variant: "green",
                  interactive: true,
                })}
              >
                <AvatarImage src={"https://i.imgur.com/u3PlVIH.png"} />
              </Avatar>
            </div>
            <span className="z-10 text-2xl font-bold">
              {" "}
              Have more questions?
            </span>

            <span className="z-10">Join our Slack community and ask away!</span>

            <GradientButton
              variant="green"
              className="z-10 mx-auto my-5 h-[50px] w-[135px] justify-center"
              Icon={SlackIcon}
            >
              <Link href={SLACK_INVITE_LINK}>Join Slack</Link>
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
}

const AccordionItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Item
      className={cn("m-5 max-sm:mx-0", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cn(
          "group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white text-[15px] leading-none sm:px-5",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <div className="xs:text-xs flex-1 group-data-[state=open]:text-green-600 sm:text-sm md:text-lg">
          {children}
        </div>
        <ChevronDownIcon
          className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] h-[20px] w-[20px] transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-green-600"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={cn(
        "overflow-hidden text-start text-[15px] text-slate-800 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="px-5 py-[15px]">{children}</div>
    </Accordion.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";
