"use client";

import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";
import { usePersonaChat } from "@/components/context/persona/chat-context";
import { TabPageContainer } from "@/components/page-specific/persona-tab-layout/tab-page-container";
import { mapUrlBackgroundColorParamToVariant } from "@/components/persona-archetype-generic/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  avatarVariants,
  gradientLightVariants,
  textColorVariants,
} from "@/components/variants";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { PersonStandingIcon, UserPlusIcon } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InfoCircledIcon,
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import OrbitingCircles from "@/components/ui/magicui/orbiting-circles";
import { IconSwitch } from "@tabler/icons-react";

export default function PersonaLabPage() {
  const { personas } = usePersonaChat();

  const [carousel1Index, setCarousel1Index] = useState<number | null>(0);
  const [carousel2Index, setCarousel2Index] = useState<number | null>(1);

  /**
   * Calculates the next index for the carousel, treating null as 0.
   * @param currentIndex - The current index of the carousel, can be null.
   * @param otherIndex - The index of the other carousel, can be null.
   * @param step - The step to increment the index by.
   * @returns The next index, ensuring it does not collide with otherIndex.
 /**
 * Calculates the next index for the carousel, treating null as 0 for calculation purposes.
 * @param currentIndex - The current index of the carousel, can be null.
 * @param otherIndex - The index of the other carousel, can be null.
 * @param step - The step to increment the index by.
 * @returns The next index, ensuring it does not collide with otherIndex.
 */
  const getNextIndex = (
    currentIndex: number | null,
    otherIndex: number | null,
    step: number,
  ): number => {
    const current = currentIndex === null ? 0 : currentIndex;
    const other = otherIndex === null ? 0 : otherIndex;

    let nextIndex = (current + step + personas.length) % personas.length;
    if (nextIndex === other) {
      nextIndex = (nextIndex + step + personas.length) % personas.length;
    }
    return nextIndex;
  };

  /**
   * Handles the change of the first carousel.
   * @param step - The step to change the index by.
   */
  const handleCarousel1Change = (step: number) => {
    setCarousel1Index((prevIndex) =>
      getNextIndex(prevIndex === null ? 0 : prevIndex, carousel2Index, step),
    );
    setHasFirstChange(true);
  };

  /**
   * Handles the change of the second carousel.
   * @param step - The step to change the index by.
   */
  const handleCarousel2Change = (step: number) => {
    setCarousel2Index((prevIndex) =>
      getNextIndex(prevIndex === null ? 0 : prevIndex, carousel1Index, step),
    );
    setHasFirstChange(true);
  };

  const [hasFirstChange, setHasFirstChange] = useState(false);
  const [openToolTip, setOpenToolTip] = useState(false);
  const [forceOpen, setForceOpen] = useState(false);

  // Control tooltip visibility based on hover and first change
  // Tooltip should only be visible if the user has not yet selected a persona or if they are hovering over the info icon
  const effectiveOpen = forceOpen || (!hasFirstChange && openToolTip);

  return (
    <TabPageContainer>
      <Tooltip open={effectiveOpen} onOpenChange={setOpenToolTip}>
        <TooltipTrigger asChild>
          <div className="flex w-full items-center justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold" id="persona-lab-title">
                Persona Lab
              </h1>
              <span id="persona-lab-description">
                Create & Combine Personas
              </span>
            </div>

            <Button
              variant={"outline"}
              size={"icon"}
              className="absolute right-2 top-2"
              onClick={() => setOpenToolTip(true)}
              onMouseEnter={() => setForceOpen(true)}
              onMouseLeave={() => setForceOpen(false)}
            >
              <InfoCircledIcon className="size-4 text-muted-foreground hover:text-gray-600" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent className="p-2 text-xs">
          <h2 className="font-bold">Persona Lab Combiner</h2>
          <p>
            Select Two Personas to combine them. The combined persona will be a
            mix of both the persona&apos;s attributes.
          </p>
        </TooltipContent>
      </Tooltip>

      <div className="grid size-full grid-cols-3 gap-2 p-2">
        {carousel1Index !== null ? (
          <PersonaPreview
            archetype={personas[carousel1Index]}
            onNext={() => handleCarousel1Change(1)}
            onPrev={() => handleCarousel1Change(-1)}
            onCreateNew={() => {
              setCarousel1Index(null);
            }}
          />
        ) : (
          <CreatePersonaPreview
            onNext={() => handleCarousel1Change(1)}
            onPrev={() => handleCarousel1Change(-1)}
          />
        )}
        <PersonaCombinePreview
          archetype1={carousel1Index !== null ? personas[carousel1Index] : null}
          archetype2={carousel2Index !== null ? personas[carousel2Index] : null}
        />
        {carousel2Index !== null ? (
          <PersonaPreview
            archetype={personas[carousel2Index]}
            onNext={() => handleCarousel2Change(1)}
            onPrev={() => handleCarousel2Change(-1)}
            onCreateNew={() => {
              setCarousel2Index(null);
            }}
          />
        ) : (
          <CreatePersonaPreview
            onNext={() => handleCarousel2Change(1)}
            onPrev={() => handleCarousel2Change(-1)}
          />
        )}
      </div>
    </TabPageContainer>
  );
}

function PersonaCombinePreview({
  archetype1,
  archetype2,
}: {
  archetype1: PersonaArchetype | null;
  archetype2: PersonaArchetype | null;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-6 rounded-lg border border-gray-300 bg-gray-100 p-4 py-10">
      <div className="flex flex-col items-center gap-2">
        <div className="relative grid size-[200px] place-items-center">
          <OrbitingCircles
            className="size-[50px] border-none bg-transparent"
            duration={20}
            delay={20}
            radius={80}
          >
            <PersonaAvatarCombinePreview archetype={archetype1} />
          </OrbitingCircles>
          <PersonStandingIcon className="size-8" />
          <OrbitingCircles
            className="size-[50px] border-none bg-transparent"
            duration={20}
            delay={10}
            radius={80}
          >
            <PersonaAvatarCombinePreview archetype={archetype2} />
          </OrbitingCircles>
        </div>
        <h3 className="text-2xl font-bold">Combine Personas</h3>
        <span className="text-center text-xs">
          This process will create a new persona and will not delete or modify
          any existing personas
        </span>
      </div>
      <div className="flex w-full items-center justify-center gap-10">
        <PersonaAvatarInfoCombinePreview archetype={archetype1} />
        <PersonaAvatarInfoCombinePreview archetype={archetype2} />
      </div>
    </div>
  );
}

function PersonaAvatarInfoCombinePreview({
  archetype,
}: {
  archetype: PersonaArchetype | null;
}) {
  if (!archetype) {
    return (
      <div className="flex flex-col items-center">
        <div className="m-2 grid size-10 place-items-center rounded-full border border-input bg-background">
          <QuestionMarkIcon className="size-3" />
        </div>
        <span className="text-xs font-semibold">Selected Persona</span>
        <span className="text-xs font-semibold">No Persona Selected</span>
      </div>
    );
  }

  const variant = mapUrlBackgroundColorParamToVariant({
    url: archetype.pictureURL,
  });

  return (
    <div className="flex flex-col items-center">
      <PersonaAvatarCombinePreview archetype={archetype} size="sm" />
      <span className="text-xs font-semibold">Selected Persona</span>
      <span
        className={textColorVariants({
          variant,
          className: "text-xs font-semibold",
        })}
      >
        {archetype.archetype_name}
      </span>
    </div>
  );
}

function PersonaAvatarCombinePreview({
  archetype,
  size = "default",
  ...Props
}: HTMLAttributes<HTMLDivElement> & {
  archetype: PersonaArchetype | null;
  size?: "sm" | "default";
}) {
  if (!archetype) {
    return (
      <div {...Props}>
        <div className="m-2 grid size-10 place-items-center rounded-full border border-input bg-background">
          <QuestionMarkIcon className="size-3" />
        </div>
      </div>
    );
  }

  const variant = mapUrlBackgroundColorParamToVariant({
    url: archetype.pictureURL,
  });

  const avatarFallbackName =
    archetype.archetype_name ||
    "Persona Archetype"
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

  return (
    <div {...Props}>
      <Avatar
        className={avatarVariants({
          variant,
          size,
          interactive: false,
          className: "transition-none hover:border-2",
        })}
      >
        <AvatarImage
          src={archetype.pictureURL}
          alt={[
            (
              archetype.archetype_name || "Persona Archetype"
            ).toLocaleLowerCase(),
            "persona avatar",
          ].join(" ")}
        />
        <AvatarFallback>{avatarFallbackName}</AvatarFallback>
      </Avatar>
    </div>
  );
}

function PersonaPreview({
  archetype,
  onNext,
  onPrev,
  onCreateNew,
}: {
  archetype: PersonaArchetype;
  onNext: () => void;
  onPrev: () => void;
  onCreateNew: () => void;
}) {
  const variant = mapUrlBackgroundColorParamToVariant({
    url: archetype.pictureURL,
  });

  const avatarFallbackName =
    archetype.archetype_name ||
    "Persona Archetype"
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

  return (
    <div
      className={gradientLightVariants({
        variant,
        className:
          "relative flex h-full w-full flex-col items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 p-4",
      })}
    >
      <div className="absolute top-0 flex w-full items-center justify-between p-4 text-muted-foreground">
        <button tabIndex={0} onClick={onPrev}>
          <ArrowLeftCircleIcon className="size-6 cursor-pointer" />
        </button>
        <button tabIndex={0} onClick={onNext}>
          <ArrowRightCircleIcon className="size-6 cursor-pointer" />
        </button>
      </div>
      <div className="flex w-full flex-col items-center p-4">
        <Avatar
          className={avatarVariants({
            variant,
            size: "sm",
            interactive: false,
            className: "transition-none hover:border-2",
          })}
        >
          <AvatarImage
            src={archetype.pictureURL}
            alt={[
              (
                archetype.archetype_name || "Persona Archetype"
              ).toLocaleLowerCase(),
              "persona avatar",
            ].join(" ")}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>
        <h2
          className={textColorVariants({
            variant,
            className: "text-xl font-bold",
          })}
        >
          {archetype.archetype_name}
        </h2>
      </div>
      <ul className="grid rounded-lg border border-black/10 bg-white p-4">
        {Object.entries(archetype.persona_components).map(([key, value]) => (
          <li key={key} className="mb-1 flex flex-col">
            <span
              className={textColorVariants({
                variant,
                className: "text-sm font-semibold",
              })}
            >
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-xs font-medium">{value}</span>
          </li>
        ))}
      </ul>
      <ul className="grid rounded-lg border border-black/10 bg-white p-4">
        {Object.entries(archetype.insights).map(([key, value]) => (
          <li key={key} className="mb-1 flex flex-col">
            <span
              className={textColorVariants({
                variant,
                className: "text-sm font-semibold",
              })}
            >
              {key.replace(/_/g, " ")}
            </span>
            <span className="text-xs font-medium">{value}</span>
          </li>
        ))}
      </ul>
      <Separator className="my-4" text="or" />
      <div className="flex w-full flex-col items-center px-4">
        <GradientButton
          Icon={UserPlusIcon}
          variant={variant}
          className="w-full"
          onClick={onCreateNew}
        >
          Create a New Persona
        </GradientButton>
      </div>
    </div>
  );
}

function CreatePersonaPreview({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-2 rounded-lg border border-gray-300 bg-gray-100 p-4">
      <div className="absolute top-0 flex w-full items-center justify-between p-4 text-muted-foreground">
        <button tabIndex={0} onClick={onPrev}>
          <ArrowLeftCircleIcon className="size-6 cursor-pointer" />
        </button>
        <button tabIndex={0} onClick={onNext}>
          <ArrowRightCircleIcon className="size-6 cursor-pointer" />
        </button>
      </div>
      <div className="flex w-full flex-col items-center p-4">
        <h2 className="text-xl font-bold">Create Persona</h2>
        <span>Start from scratch</span>
      </div>
      <div className="flex w-full flex-col items-center p-4">
        <div className="relative flex w-full flex-col items-center">
          <Label htmlFor="edit-chat-description" className="px-2 text-xs">
            Enter a Social Media Profile URL
          </Label>
          <Input
            className="w-full rounded-lg border border-black/10 p-2"
            placeholder={"instagram.com/username"}
            value={"instagram.com/username"}
            onChange={(e) => {}}
          />
        </div>
        <Separator className="my-4" text="and - or" />
        <div className="relative flex w-full flex-col items-center">
          <Label htmlFor="edit-chat-description" className="px-2 text-xs">
            Enter Persona details
          </Label>
          <Textarea
            className="h-[220px] w-full rounded-lg border border-black/10 p-2"
            placeholder={"A customer who..."}
            value={"A customer who..."}
            onChange={(e) => {}}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-4">
        <GradientButton Icon={UserPlusIcon} variant="blue" className="w-full">
          Create Persona
        </GradientButton>
      </div>
    </div>
  );
}
