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
      <PopoverContent className="mx-2 shadow-4xl p-1 w-fit">
        <div
          className={gradientLightVariants({
            variant: "blue",
            className: "rounded-lg p-2 border border-input text-xs font-mono",
          })}
        >
          {link}
        </div>
        <Button
          variant={"outline"}
          onClick={handleCopyLink}
          className="w-full gap-2 hover:text-primary rounded-lg hover:scale-100 h-fit  p-1 shadow-md group font-semibold text-muted-foreground text-sm hover:text-black transition-colors duration-300 ease-out mt-2"
        >
          {copied ? (
            <>
              Copied{" "}
              <CheckIcon className="text-muted-foreground size-4 group-hover:text-black/90 transition-colors duration-300 ease-out" />
            </>
          ) : (
            <>
              Copy Link
              <CopyIcon className="text-muted-foreground size-4 group-hover:text-black/90 transition-colors duration-300 ease-out" />
            </>
          )}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
