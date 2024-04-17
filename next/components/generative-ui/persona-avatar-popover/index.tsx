import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonStandingIcon, DownloadCloudIcon } from "lucide-react";
import { PersonaTabs } from "./tabs";
import { cva, VariantProps } from "class-variance-authority";
import {
  cn,
  colorDistance,
  extractParameterFromURL,
  hexToRgb,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { z } from "zod";

export const PersonaArchetypeValidator = z.object({
  archetype_name: z.string(),
  pictureURL: z.string(),
  persona_components: z.object({
    Motivations: z.string(),
    Painpoints: z.string(),
    Preferences_and_Needs: z.string(),
    End_Goal: z.string(),
    Mindset_and_Perspective: z.string(),
  }),
  insights: z.object({
    Enhanced_Interaction_Patterns: z.string(),
    Strategic_Recommendations: z.string(),
  }),
});

export type PersonaArchetype = {
  archetype_name: string;
  pictureURL: string;
  persona_components: {
    Motivations: string;
    Painpoints: string;
    Preferences_and_Needs: string;
    End_Goal: string;
    Mindset_and_Perspective: string;
  };
  insights: {
    Enhanced_Interaction_Patterns: string;
    Strategic_Recommendations: string;
  };
};

export const ColorVariantMap = {
  blue: "#c7eaf1",
  purple: "#d9cbfc",
  red: "#ef9796",
  yellow: "#fbe8b1",
  green: "#c2e4bc",
  brown: "#e6d3d0",
  pink: "#eaa9c1",
} as const;

export type ColorVariant = keyof typeof ColorVariantMap;

/**
 * Finds the closest color variant based on a hex color.
 */
function findClosestColorVariant(hexColor: string): ColorVariant {
  const colorRgb = hexToRgb(hexColor);
  let closestColor: ColorVariant = "blue";
  let smallestDistance = Number.MAX_VALUE;

  for (const variant in ColorVariantMap) {
    const variantRgb = hexToRgb(ColorVariantMap[variant as ColorVariant]);
    const distance = colorDistance(colorRgb, variantRgb);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestColor = variant as ColorVariant;
    }
  }

  return closestColor;
}

/**
 * Maps a URL background color parameter to a color variant.
 */
export function mapUrlBackgroundColorParamToVariant({
  url,
  param = "backgroundColor",
}: {
  url: string;
  param?: string;
}): ColorVariant {
  const color = extractParameterFromURL(url, param);
  const hex = "#" + color;
  if (color && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) {
    return findClosestColorVariant(hex);
  }

  // If color is not valid hex, return a default color
  return "blue"; // Assuming blue is the default; adjust as necessary
}

export const avatarVariants = cva(
  "ring-offset-transparent transition-all duration-500 ease shadow-md  ",
  {
    variants: {
      variant: {
        blue: "border-pastel-blue ring-pastel-blue/75 shadow-pastel-blue",
        purple:
          "border-pastel-purple ring-pastel-purple/75 shadow-pastel-purple",
        red: "border-pastel-red ring-pastel-red/75 shadow-pastel-red",
        yellow:
          "border-pastel-yellow ring-pastel-yellow/75 shadow-pastel-yellow",
        green: "border-pastel-green ring-pastel-green/75 shadow-pastel-green",
        brown: "border-pastel-brown ring-pastel-brown/75 shadow-pastel-brown",
        pink: "border-pastel-pink ring-pastel-pink/75 shadow-pastel-pink",
      },
      size: {
        xl: "border-2 h-24 w-24 m-4",
        default: "h-14 w-14 border-4 hover:border-6 ring-offset-4 m-2",
        sm: "h-10 w-10 border-2 hover:border-4 ring-offset-4 m-2",
        preview: "h-4 w-4 border-2 hover:border-3 ring-offset-4 m-2",
      },
      interactive: {
        true: "cursor-pointer hover:scale-110 hover:ring-1 hover:shadow-lg",
        false: "cursor-default",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "default",
      interactive: true,
    },
  }
);

export const tabTriggerVariants = cva("rounded-full py-1 px-4 ", {
  variants: {
    variant: {
      blue: "focus-visible:ring-pastel-blue ring-offset-pastel-blue/75",
      purple: "focus-visible:ring-pastel-purple ring-offset-pastel-purple/75",
      red: "focus-visible:ring-pastel-red ring-offset-pastel-red/75",
      yellow: "focus-visible:ring-pastel-yellow ring-offset-pastel-yellow/75",
      green: "focus-visible:ring-pastel-green ring-offset-pastel-green/75",
      brown: "focus-visible:ring-pastel-brown ring-offset-pastel-brown/75",
      pink: "focus-visible:ring-pastel-pink ring-offset-pastel-pink/75",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const gradientLightVariants = cva("bg-gradient-to-b ", {
  variants: {
    variant: {
      blue: "from-pastel-blue/25 to-pastel-blue/5",
      purple: "from-pastel-purple/25 to-pastel-purple/5",
      red: "from-pastel-red/25 to-pastel-red/5",
      yellow: "from-pastel-yellow/25 to-pastel-yellow/5",
      green: "from-pastel-green/25 to-pastel-green/5",
      brown: "from-pastel-brown/25 to-pastel-brown/5",
      pink: "from-pastel-pink/25 to-pastel-pink/5",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const gradientVariants = cva("bg-gradient-to-b ", {
  variants: {
    variant: {
      blue: "from-pastel-blue to-pastel-blue/25",
      purple: "from-pastel-purple to-pastel-purple/25",
      red: "from-pastel-red to-pastel-red/25",
      yellow: "from-pastel-yellow to-pastel-yellow/25",
      green: "from-pastel-green to-pastel-green/25",
      brown: "from-pastel-brown to-pastel-brown/25",
      pink: "from-pastel-pink to-pastel-pink/25",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const shadowVariants = cva("shadow-md", {
  variants: {
    variant: {
      blue: "shadow-pastel-blue/50",
      purple: "shadow-pastel-purple/50",
      red: "shadow-pastel-red/50",
      yellow: "shadow-pastel-yellow/50",
      green: "shadow-pastel-green/50",
      brown: "shadow-pastel-brown/50",
      pink: "shadow-pastel-pink/50",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export interface PersonaAvatarPopoverProps
  extends VariantProps<typeof avatarVariants> {
  archetype: PersonaArchetype;
}

export function PersonaAvatarPopover(props: PersonaAvatarPopoverProps) {
  const { variant, size, archetype } = props;
  const avatarFallbackName = archetype.archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className={avatarVariants({ variant, size })}>
          <AvatarImage
            src={archetype.pictureURL}
            alt={[
              archetype.archetype_name.toLocaleLowerCase(),
              "persona avatar",
            ].join(" ")}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          shadowVariants({
            variant,
            className: "w-full rounded-2xl m-2",
          })
        )}
      >
        <Tabs defaultValue={PersonaTabs[0].title} className="w-[400px]">
          <div className="w-full grid place-items-center">
            <PersonStandingIcon className="text-muted-foreground" />
            <TabsList className="rounded-full h-9 my-4">
              {PersonaTabs.map((tab) => (
                <TabsTrigger
                  value={tab.title}
                  key={tab.title}
                  className={tabTriggerVariants({ variant })}
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {PersonaTabs.map((tab) => (
            <TabsContent value={tab.title} key={tab.title + "content"}>
              <ScrollArea
                className={cn(
                  gradientLightVariants({
                    variant,
                    className: "h-[400px] grid border rounded-lg shadow-md",
                  })
                )}
              >
                <tab.content {...props} />
              </ScrollArea>

              <p className="text-sm text-muted-foreground text-center my-4">
                {tab.description}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
