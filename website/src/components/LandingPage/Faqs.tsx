// import { Container } from './Container'
import backgroundImage from "../../images/background-faqs.jpg";
import { Container } from "../Container";

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
      question: "What if I need help with AIConsultingTools.com?",
      answer:
        "If you have any questions or issues with AIConsultingTools.com, our support team is available to assist you. Simply email us and we’ll get back to you as soon as possible.",
    },
    {
      question:
        "How can I provide feedback or suggestions for AIConsultingTools.com?",
      answer:
        "We love hearing from our users and welcome any feedback or suggestions for improving our platform. You can provide suggestions by clicking Send Feedback when logged in.",
    },
  ],
  [
    {
      question: "How does AIConsultingTools.com save me time?",
      answer:
        "AIConsultingTools.com  uses AI-powered technology to instantly generate SWOT analyses, PESTEL analyses, Lean Canvases, and User Personas from just the description of a product or service, which can be customized after.",
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <img
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team
            and someone will get back to you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
