import { HTMLAttributes, useState } from "react";
// import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type UserPersona = {
  name: string;
  gender: string; //required for getting the pictureURL
  pictureURL: string;
  personalAttributes: { label: string; description: string; icon: string }[];
  sections: { label: string; description: string }[];
};

interface Props extends UserPersona, HTMLAttributes<HTMLDivElement> {}

export const EXAMPLE_PERSONA: UserPersona = {
  name: "Alex Johnson",
  gender: "Male",
  pictureURL: "/test_avatar.jpg",
  personalAttributes: [
    {
      label: "Age",
      description: "30",
      icon: "👨‍🦰",
    },
    {
      label: "Occupation",
      description: "Digital Marketer",
      icon: "💼",
    },
    {
      label: "Location",
      description: "San Francisco, CA",
      icon: "📍",
    },
    {
      label: "Family Status",
      description: "Single",
      icon: "🏠",
    },
  ],
  sections: [
    {
      label: "Alex Johnson",
      description:
        "Alex is a tech-savvy digital marketer with a keen interest in the latest marketing automation tools. They have over 5 years of experience in the field and are always looking for ways to improve their campaigns through technology.",
    },
    {
      label: "Motivations",
      description:
        "Alex is motivated by the desire to stay ahead of the curve in digital marketing trends and tools, aiming to leverage technology to achieve better results for their clients.",
    },
    {
      label: "Devices",
      description: "Smartphone, Laptop, Smartwatch",
    },
    {
      label: "Pains",
      description:
        "Struggles with finding an all-in-one marketing tool that integrates seamlessly with various platforms. Also, finds it challenging to keep up with the rapid pace of technological advancements.",
    },
    {
      label: "Goals",
      description:
        "To master the use of marketing automation tools to increase campaign efficiency and effectiveness. Alex also aims to become a thought leader in digital marketing by sharing insights and best practices.",
    },
    {
      label: "Brand Affiliations",
      description: "Google, Apple, HubSpot",
    },
  ],
};

export default function UserPersona({
  name,
  gender,
  pictureURL,
  personalAttributes,
  sections,
  className,
  ...Props
}: Props) {
  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-0 m-4 shadow-lg rounded-xl overflow-hidden bg-persona-background",
        className
      )}
      {...Props}
    >
      <div className="row-span-2 col-span-1 grid grid-rows-2 shadow-xl rounded-xl overflow-hidden border-2 border-persona-border">
        <div className="flex-grow relative">
          <img
            src={pictureURL}
            alt="Image"
            // fill={true}
            className="object-contain"
          />
        </div>
        <div className="grid grid-cols-2 bg-persona-foreground">
          {personalAttributes.map((section, index) => (
            <EditableAttributeCard
              key={index}
              label={section.label}
              description={section.description}
              icon={section.icon}
            />
          ))}
        </div>
      </div>

      {sections.map((section, index) => (
        <PersonaText
          key={index}
          label={section.label}
          description={section.description}
        />
      ))}
    </div>
  );
}

interface PersonaTextProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  description: string;
}

function PersonaText({
  label,
  description,
  className,
  ...Props
}: PersonaTextProps) {
  const [content, setContent] = useState(description);

  return (
    <div
      className={cn(
        "p-4 text-persona-title text-center flex-grow flex flex-col",
        className
      )}
      {...Props}
    >
      <h3 className="text-2xl font-bold">{label}</h3>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="resize-none flex-grow mt-2 bg-persona-background/80 text-persona-text focus-visible:ring-persona-accent border-persona-border min-h-[150px]"
      />
    </div>
  );
}

interface GenericStatusProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  label: string;
  description: string;
}

const EditableAttributeCard = ({
  icon,
  label,
  description,
  className,
  ...Props
}: GenericStatusProps) => {
  const [content, setContent] = useState(description);

  return (
    <div
      className={cn(
        "p-1 grid place-items-center bg-persona-background shadow-lg rounded-lg m-2 text-center font-bold",
        className
      )}
      {...Props}
    >
      <h2 className="text-xl mt-1">{icon}</h2>
      <h2 className="text-xs text-persona-title/80">{label}</h2>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="resize-none border-none scrollbar-hidden mt-2 text-center text-persona-text text-xs focus-visible:ring-persona-accent bg-persona-background"
        rows={2}
      />
    </div>
  );
};

export const PersonaActions = () => {
  return (
    <div className="flex gap-4 lg:gap-8 my-4 overflow-hidden flex-wrap justify-center">
      {[
        {
          suggestion: "Change Colour",
        },
        {
          suggestion: "Change Picture",
        },
        {
          suggestion: "Download Image",
        },
      ].map((userAction, i) => (
        <Button key={i}>{userAction.suggestion}</Button>
      ))}
    </div>
  );
};
