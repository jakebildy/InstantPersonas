import { PersonaAvatarPopover } from "@/components/generative-ui/persona-avatar-popover";
import { PersonaTemplate } from "@/components/generative-ui/persona-avatar-popover/templates/template";
import { PersonaChangeDiffCard } from "@/components/generative-ui/persona-avatar-popover/persona-change-diff-card";

import React from "react";
import ConfirmKnowledgeCard from "@/components/generative-ui/confirm-knowledge-card";
import { EditPersonaButton } from "@/components/generative-ui/persona-avatar-popover/tabs/manage-buttons/edit-persona";

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

const TEST_KNOWLEDGE_CONFIRMATION = {
  business:
    "The user works as a UX designer for a company specializing in smart thermostats. The company's products feature functionalities like learning user habits and preferences, optimizing comfort and energy usage, and remote control via smartphone apps. Recent user feedback has highlighted both strengths (ease of use, learning capabilities, integration with major platforms) and areas for improvement (compatibility challenges with certain smart home devices, limited automation options, complexity in advanced setup, privacy and security concerns).",
  target_problem:
    "The primary challenge is refining the smart thermostat's integration with a broad spectrum of smart home systems and devices to improve user experience, enhance automation and personalization capabilities, ensure broader compatibility, and address privacy and security concerns. This involves leveraging positive user feedback while addressing the noted areas for improvement.",
};

const TEST_EDIT_PERSONA_PROPS = {
  archetype: {
    archetype_name: "Gourmet Feline Enthusiast",
    picture_components: {
      clothing: "sweater_vest",
      glasses: "glasses",
      hair: "ponytail",
    },
    persona_components: {
      Motivations:
        "Their motivation is to provide a delightful and enriching experience for their beloved cats, while ensuring the toys match their refined tastes and home decor.",
      Painpoints:
        "Difficulty in finding cat toys that are durable, well-made, and stylish, that don’t create a jarring visual contrast with their meticulously curated home environment.",
      Preferences_and_Needs:
        "High-end, aesthetically pleasing, and uniquely designed cat toys that offer engaging play for their pets.",
      End_Goal:
        "To provide the best lifestyle for their cats while maintaining their home's sophisticated aesthetics.",
      Mindset_and_Perspective:
        "They view their pets as an extension of themselves and their lifestyle, and they’re determined to provide the best possible care and happiness.",
    },
    insights: {
      Enhanced_Interaction_Patterns:
        "Gourmet Feline Enthusiasts prefer to shop online, appreciating detailed descriptions and professional photography that showcase product design and materials. They appreciate personalized customer service, with live chat or email support for any queries, and online customer reviews.",
      Strategic_Recommendations:
        "Focus on high-quality product photography and storytelling to help this persona visualize the products in their homes. Enhance customer service and consider implementing a loyalty program to reward their high spending.",
    },
    pictureURL:
      "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant14&hair=variant39&backgroundColor=c2e4bc",
  },
  variant: "green",
};

export default function page({}: Props) {
  // const randomColor = [
  //   "blue",
  //   "purple",
  //   "red",
  //   "yellow",
  //   "green",
  //   "brown",
  //   "pink",
  // ] as const;
  // const difftest = {
  //   ...TEST_PERSONA_ARCHETYPES.persona_archetypes[0],
  //   persona_components: {
  //     ...TEST_PERSONA_ARCHETYPES.persona_archetypes[0].persona_components,
  //     End_Goal:
  //       "To maintain a consistently comfortable home environment with minimal personal effort and maximum energy efficiency.",
  //   },
  // };

  return (
    <div className="w-screen min-h-screen grid place-items-center my-[100px] gap-8">
      <EditPersonaButton {...TEST_EDIT_PERSONA_PROPS} />
      {/* <div className="flex gap-2">
        {TEST_PERSONA_ARCHETYPES.persona_archetypes.map((archetype) => {
          return (
            <PersonaAvatarPopover
              key={archetype.archetype_name}
              archetype={archetype}
              variant={randomColor[Math.floor(Math.random() * 7)]}
            />
          );
        })}
      </div>
      <div className="w-[600px]">
        <PersonaTemplate
          archetype={TEST_PERSONA_ARCHETYPES.persona_archetypes[0]}
          variant={randomColor[Math.floor(Math.random() * 7)]}
        />
      </div>
      <div className="w-[600px]">
        <PersonaChangeDiffCard
          origin_archetype={TEST_PERSONA_ARCHETYPES.persona_archetypes[0]}
          // updated_archetype={difftest}
          updated_archetype={TEST_PERSONA_ARCHETYPES.persona_archetypes[1]}
        />
      </div>
      <div className="w-[600px]">
        <ConfirmKnowledgeCard
          business={TEST_KNOWLEDGE_CONFIRMATION.business}
          target_problem={TEST_KNOWLEDGE_CONFIRMATION.target_problem}
        />
      </div> */}
    </div>
  );
}
