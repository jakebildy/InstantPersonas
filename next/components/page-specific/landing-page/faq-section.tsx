import { BackgroundGradient } from "@/components/ui/aceternity/card_background_gradient";
import { Container } from "./container";
import { BackgroundGradientAnimation } from "@/components/ui/aceternity/gradient_background";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Can I customize the personas after the AI generates it?",
    answer:
      "Yep! You can easily change the text and download it after. You can also change them simply by talking to our AI. Good personas should be adjusted as you learn more, so we've built our tool specifically with this in mind.",
  },
  {
    question: "Can you support this framework/build this SEO/marketing tool?",
    answer:
      "Reach out to our support team! If we see demand and can support it, we will be happy to implement it. You can send feedback by clicking Send Feedback when logged in.",
  },
  {
    question: "What if I need help with InstantPersonas?",
    answer:
      "If you have any questions or issues with InstantPersonas.com, our support team is available to assist you. Simply click Send Feedback when logged in and we'll get back to you as soon as possible. We're also happy to hop on a call and help with onboarding if you need it.",
  },
  {
    question: "How can I provide feedback or suggestions for InstantPersonas?",
    answer:
      "We love hearing from our users and welcome any feedback or suggestions for improving our platform. You can provide suggestions by clicking Send Feedback when logged in.",
  },
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
];

export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className=" bg-white">
      {/* <BackgroundGradientAnimation> */}
      {/* <img src="/pastel_background.jpg" className="absolute top-0 left-0 z-0" /> */}
      <Container className=" mt-20 text-center w-screen h-full">
        <div className="mx-auto ">
          <h2
            id="faq-title"
            className="font-display text-4xl tracking-tight text-black font-bold sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-800 mb-10">
            If you can&apos;t find what you&apos;re looking for, email our
            support team and someone will get back to you.
          </p>
        </div>

        <div className="flex flex-auto  mx-auto justify-center">
          <Accordion.Root
            className=" w-[800px] rounded-md shadow-black/5 h-screen "
            type="single"
            defaultValue="item-0"
            collapsible
          >
            {faqs.map((faq, faqIndex) => (
              <AccordionItem
                className="AccordionItem"
                value={"item-" + faqIndex}
                key={faqIndex}
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
                <div className="h-0.5 w-full bg-gray-100  border-none" />
              </AccordionItem>
            ))}
          </Accordion.Root>
        </div>
      </Container>
      {/* </BackgroundGradientAnimation> */}
    </section>
  );
}

const AccordionItem = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Item
      className={cn("m-5", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cn(
          "group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <div className="group-data-[state=open]:text-green-600 sm:text-sm xs:text-xs md:text-lg ">
          {children}
        </div>
        <ChevronDownIcon
          className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-green-600  h-[20px] w-[20px]"
          aria-hidden
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={cn(
        "text-slate-800 text-start data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden text-[15px]",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
  )
);
AccordionContent.displayName = "AccordionContent";
