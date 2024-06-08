import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ShareIcon, CheckIcon, CopyIcon } from "lucide-react";
import React from "react";
import { gradientLightVariants } from "../variants";
import { Button } from "./button";
import { GradientButton } from "./gradient-button";

type Props = {
  link: string;
  onCopy?: () => void;
  className?: string;
};

export default function CopyLinkPopover({ link, onCopy, className }: Props) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(link);
    onCopy ? onCopy() : null;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <GradientButton Icon={ShareIcon} className={className}>
          Share
        </GradientButton>
      </PopoverTrigger>
      <PopoverContent className="shadow-4xl mx-2 w-fit p-1">
        <div
          className={gradientLightVariants({
            variant: "blue",
            className: "rounded-lg border border-input p-2 font-mono text-xs",
          })}
        >
          {link}
        </div>
        <Button
          variant={"outline"}
          onClick={handleCopyLink}
          className="group mt-2 h-fit w-full gap-2 rounded-lg p-1 text-sm font-semibold text-muted-foreground shadow-md transition-colors duration-300 ease-out hover:scale-100 hover:text-black hover:text-primary"
        >
          {copied ? (
            <>
              Copied{" "}
              <CheckIcon className="size-4 text-muted-foreground transition-colors duration-300 ease-out group-hover:text-black/90" />
            </>
          ) : (
            <>
              Copy Link
              <CopyIcon className="size-4 text-muted-foreground transition-colors duration-300 ease-out group-hover:text-black/90" />
            </>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
