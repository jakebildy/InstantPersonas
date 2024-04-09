import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  avatarVariants,
  downloadButtonVariants,
  gradientVariants,
  PersonaAvatarPopoverProps,
} from "..";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DownloadCloudIcon } from "lucide-react";

export function PersonaTab({ variant, archetype }: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  const avatarFallbackName = archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div>
      <div className="flex gap-2 border-b">
        <Avatar
          className={avatarVariants({
            variant,
            size: "xl",
            interactive: false,
          })}
        >
          <AvatarImage
            src="/test-persona-avatar.jpg"
            alt={[archetype_name.toLocaleLowerCase(), "persona avatar"].join(
              " "
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col my-6 gap-2">
          <div className="flex flex-col">
            <span className="text-muted-foreground font-semibold text-sm">
              Archetype
            </span>
            <span className="font-bold">{archetype_name}</span>
          </div>
          <Button
            size="icon"
            variant={"secondary"}
            className={downloadButtonVariants({
              variant,
              className: "flex gap-2 px-2 pr-3 items-center",
            })}
          >
            <DownloadCloudIcon className="h-4 w-4" /> <span>Download</span>
          </Button>
        </div>
      </div>

      <div
        className={gradientVariants({
          variant,
          className: "flex gap-2 p-4 overflow-auto rounded-lg m-2",
        })}
      >
        <ul>
          {Object.entries(persona_components).map(([key, value]) => (
            <li key={key} className="flex flex-col gap-1 mb-4">
              <span className="text-muted-foreground font-semibold text-sm">
                {key.replace(/_/g, " ")}
              </span>
              <span className="text-sm font-medium">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
