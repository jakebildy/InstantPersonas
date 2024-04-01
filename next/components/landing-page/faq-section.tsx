import { BackgroundGradient } from "../aceternity-ui/card_background_gradient";
import { Container } from "../container";
import { BackgroundGradientAnimation } from "../aceternity-ui/gradient_background";

const faqs = [
  [
    {
      question: "Can I customize the analyses after the AI generates it?",
      answer: "Yep! You can easily change the text and download it after.",
    },
    {
      question: "Can you support this framework/analysis?",
      answer:
        "Reach out to our support team! If we see demand and can support it, we will be happy to implement it.",
    },
  ],
  [
    {
      question: "What if I need help with InstantPersonas.com?",
      answer:
        "If you have any questions or issues with InstantPersonas.com, our support team is available to assist you. Simply email us and we’ll get back to you as soon as possible.",
    },
    {
      question:
        "How can I provide feedback or suggestions for InstantPersonas.com?",
      answer:
        "We love hearing from our users and welcome any feedback or suggestions for improving our platform. You can provide suggestions by clicking Send Feedback when logged in.",
    },
  ],
  [
    {
      question: "How does InstantPersonas.com save me time?",
      answer:
        "InstantPersonas.com uses AI-powered technology to instantly generate User Personas. Just by talking to our AI, you're able to figure out gaps in your understanding of your target market, and adjust accordingly.",
    },
  ],
];

export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative bg-white rounded-b-2xl"
    >
      <BackgroundGradientAnimation>
        <Container className="relative mt-20">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2
              id="faq-title"
              className="font-display text-3xl tracking-tight text-white font-bold sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-100">
              If you can&apos;t find what you&apos;re looking for, email our
              support team and someone will get back to you.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
          >
            {faqs.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul role="list" className="flex flex-col gap-y-8 ">
                  {column.map((faq, faqIndex) => (
                    <BackgroundGradient
                      className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900"
                      key={faqIndex}
                    >
                      <li>
                        <h3 className="font-display text-lg leading-7 text-black">
                          {faq.question}
                        </h3>
                        <p className="mt-4 text-sm text-slate-900">
                          {faq.answer}
                        </p>
                      </li>
                    </BackgroundGradient>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </BackgroundGradientAnimation>
    </section>
  );
}
