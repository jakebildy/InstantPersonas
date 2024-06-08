import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonStandingIcon } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  avatarVariants,
  gradientLightVariants,
  shadowVariants,
  tabTriggerVariants,
} from "@/components/variants";
import { PersonaTabs } from "./tabs";
import { PersonaArchetype } from "@/app/(server)/models/persona-ai.model";

export interface PersonaAvatarPopoverProps
  extends VariantProps<typeof avatarVariants> {
  archetype: PersonaArchetype;
  allowManage?: boolean;
}

export function PersonaAvatarPopover(props: PersonaAvatarPopoverProps) {
  const { variant, size, archetype, allowManage } = props;
  const avatarFallbackName = archetype.archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  //? Filters out the manage tab if component is being used outside of Chat AI Context to prevent unauthorized access and crashes
  const safeFilteredTabs = PersonaTabs.filter((tab) =>
    allowManage !== false ? tab : tab.title !== "Manage",
  );

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
            className: "m-2 w-full rounded-2xl",
          }),
        )}
      >
        <Tabs defaultValue={PersonaTabs[0].title} className="w-[400px]">
          <div className="grid w-full place-items-center">
            <PersonStandingIcon className="text-muted-foreground" />
            <TabsList className="my-4 h-9 rounded-full">
              {safeFilteredTabs.map((tab) => (
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

          {safeFilteredTabs.map((tab) => (
            <TabsContent value={tab.title} key={tab.title + "content"}>
              <ScrollArea
                className={cn(
                  gradientLightVariants({
                    variant,
                    className: "grid h-[400px] rounded-lg border shadow-md",
                  }),
                )}
              >
                <tab.content {...props} />
              </ScrollArea>

              <p className="my-4 text-center text-sm text-muted-foreground">
                {tab.description}
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
