import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonStandingIcon } from "lucide-react";
import { PersonaTabs } from "./tabs";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { z } from "zod";
import {
  avatarVariants,
  gradientLightVariants,
  shadowVariants,
  tabTriggerVariants,
} from "@/components/variants";
import { PersonaArchetype } from "./types";

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
    allowManage !== false ? tab : tab.title !== "Manage"
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
            className: "w-full rounded-2xl m-2",
          })
        )}
      >
        <Tabs defaultValue={PersonaTabs[0].title} className="w-[400px]">
          <div className="w-full grid place-items-center">
            <PersonStandingIcon className="text-muted-foreground" />
            <TabsList className="rounded-full h-9 my-4">
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
