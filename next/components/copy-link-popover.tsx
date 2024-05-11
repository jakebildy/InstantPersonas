import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { cx } from "class-variance-authority";
import { ShareIcon, CheckIcon, CopyIcon } from "lucide-react";
import React from "react";
import { ButtonInnerHover, gradientLightVariants } from "./variants";
import { Button } from "./ui/button";

type Props = {
  link: string;
  onCopy?: () => void;
};

export default function CopyLinkPopover({ link, onCopy }: Props) {
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
        <Button
          variant={"outline"}
          className="hover:text-primary rounded-full hover:scale-100 h-fit  p-1 shadow-md absolute right-0 m-8 group"
        >
          <span
            className={cx(
              ButtonInnerHover({ variant: "blue" }),
              gradientLightVariants({
                variant: "blue",
                className: "pl-5 flex items-center gap-2 text-sm",
              })
            )}
          >
            Share{" "}
            <ShareIcon className="text-muted-foreground pb-0.5 size-4 group-hover:text-white transition-colors duration-300 ease-out" />
          </span>
        </Button>
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
