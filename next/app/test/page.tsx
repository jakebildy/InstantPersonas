import { PersonaAvatarPopover } from "@/components/generative-ui/persona-avatar-popover";

import React from "react";

type Props = {};

const TEST_PERSONA_ARCHETYPES = {
  context:
    "Given the detailed understanding of user feedback and the company's focus on smart thermostat product enhancement, the refined user personas are designed to guide strategic improvements in product integration, user experience, and market positioning. These personas are built on insights gathered from direct user feedback, industry trends, and technological capabilities, aimed at addressing both immediate and long-term user needs.",
  persona_characteristics:
    "The key characteristics include diverse user engagement levels with smart home technology, varying degrees of technical expertise, distinct preferences for automation and personalization, and different sensitivities to privacy and security concerns.",
  persona_archetypes: [
    {
      archetype_name: "The Tech-Savvy Optimizer",
      persona_components: {
        Motivations:
          "Seeks efficiency and optimization in every aspect of life, including energy usage and home automation.",
        Painpoints:
          "Frustration with compatibility issues and the desire for more advanced automation options.",
        Preferences_and_Needs:
          "Prefers products that offer detailed customization and integration capabilities with a broad ecosystem of smart home devices.",
        End_Goal:
          "To create an optimally efficient, automated, and interconnected smart home environment.",
        Mindset_and_Perspective:
          "Views technology as a tool for enhancing life quality and is always on the lookout for the next innovation.",
      },
      insights: {
        Enhanced_Interaction_Patterns:
          "Frequently engages with online communities to share and learn about smart home setups. Prefers using advanced settings and API integrations for personalized automation.",
        Strategic_Recommendations:
          "Develop and promote advanced user guides and API documentation. Enhance compatibility with emerging smart home devices and standards.",
      },
    },
    {
      archetype_name: "The Comfort-Seeking Homeowner",
      persona_components: {
        Motivations:
          "Desires a comfortable and hassle-free home environment without needing to constantly adjust settings.",
        Painpoints:
          "Overwhelmed by complex setups and desires a more intuitive learning capability from smart devices.",
        Preferences_and_Needs:
          "Needs straightforward, easy-to-use solutions with minimal setup that still provide significant energy savings.",
        End_Goal:
          "To maintain a consistently comfortable home environment with minimal personal effort and maximum energy efficiency.",
        Mindset_and_Perspective:
          "Sees technology as a means to an end, valuable when it simplifies life without adding complexity.",
      },
      insights: {
        Enhanced_Interaction_Patterns:
          "Prefers using mobile apps for monitoring and control, appreciates proactive suggestions for comfort and savings.",
        Strategic_Recommendations:
          "Simplify the user interface and setup process. Introduce features that automate comfort settings based on user behavior.",
      },
    },
    {
      archetype_name: "The Privacy-Conscious User",
      persona_components: {
        Motivations:
          "Highly values privacy and security in the digital age, especially concerning smart home devices.",
        Painpoints:
          "Concerns about data collection, sharing, and security vulnerabilities with smart home integrations.",
        Preferences_and_Needs:
          "Prefers devices that offer robust security features and transparent privacy policies.",
        End_Goal:
          "To enjoy the conveniences of a smart home while ensuring that personal data remains secure and private.",
        Mindset_and_Perspective:
          "Skeptical of new technology's impact on privacy and security but willing to adopt devices that demonstrate clear benefits without compromising these values.",
      },
      insights: {
        Enhanced_Interaction_Patterns:
          "Cautious with sharing personal information, prefers devices that work well independently of extensive personal data.",
        Strategic_Recommendations:
          "Emphasize security features and privacy policies in marketing materials. Offer clear, easy-to-understand privacy settings within the app.",
      },
    },
    {
      archetype_name: "The Novice Adopter",
      persona_components: {
        Motivations:
          "Looking to modernize their home with smart technology but lacks technical expertise.",
        Painpoints:
          "Intimidated by the perceived complexity of smart home technology and setup processes.",
        Preferences_and_Needs:
          "Needs simple, straightforward smart devices that are easy to set up and use, with accessible customer support.",
        End_Goal:
          "To comfortably use smart home technology for basic needs, such as energy savings and home comfort, without feeling overwhelmed.",
        Mindset_and_Perspective:
          "Approaches smart home technology with curiosity but needs guidance and reassurance to fully engage.",
      },
      insights: {
        Enhanced_Interaction_Patterns:
          "Relies heavily on customer support and online tutorials. Prefers simple, guided setup processes and intuitive app interfaces.",
        Strategic_Recommendations:
          "Create easy-to-follow setup guides and video tutorials. Offer responsive customer support to assist with setup and troubleshooting.",
      },
    },
  ],
};

export default function page({}: Props) {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex gap-2">
        {TEST_PERSONA_ARCHETYPES.persona_archetypes.map((archetype) => {
          const randomColor = [
            "blue",
            "purple",
            "red",
            "yellow",
            "green",
            "brown",
            "pink",
          ] as const;

          return (
            <PersonaAvatarPopover
              key={archetype.archetype_name}
              archetype={archetype}
              variant={randomColor[Math.floor(Math.random() * 7)]}
            />
          );
        })}
      </div>
    </div>
  );
}
