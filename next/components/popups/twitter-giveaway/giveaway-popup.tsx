import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BRAND_ICONS } from "../../brand-icons";
import { BASE_URL } from "@/lib/site";
import { PopupProps, PopupSection, PopupTemplate } from "../template/popup";
import ClientTweetCard from "@/components/ui/magicui/client-tweet-card";
import { TwitterShareButton } from "react-share";
import AnimatedGridPattern from "@/components/ui/magicui/animated-grid-pattern";

export const TwitterGiveAwayPopup = ({
  variant = "blue",
  open,
  onOpenChange,
}: PopupProps) => (
  <PopupTemplate
    {...{
      variant,
      open,
      onOpenChange,
      Icon: <BRAND_ICONS.twitter className="size-6" />,
      title: "We're Doing a Giveaway!",
      subTitle: (
        <>
          Tweet about us and tag{" "}
          <b className="text-blue-500">@InstantPersonas</b> for a chance to
          <br />
          <i>win a free subscription & $50 Amazon Gift Card!</i>
        </>
      ),
      footerNote:
        "We're excited to see your tweets! Thank you for participating in our giveaway!",
    }}
  >
    <PopupSection className="relative p-8">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.5}
        duration={3}
        repeatDelay={1}
        squaresClassName="stroke-blue-500 fill-blue-500"
        className={"inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"}
      />

      <ClientTweetCard id="1802167746181873796" />
    </PopupSection>
    <PopupSection className="p-2">
      <PopupSection className="p-2">
        <p>
          Tag us{" "}
          <Link
            href={"https://x.com/InstantPersonas"}
            className="font-semibold text-blue-500 underline"
          >
            @InstantPersonas
          </Link>{" "}
          for a chance to{" "}
          <b className="text-green-500">
            Win a Free Subscription & $50 Amazon Gift Card!
          </b>
          <br />
          <br />
          <div className="flex items-center justify-between text-xs">
            <span>The tweet with the most likes will win!</span>
            <span>Ends on 31st of August</span>
          </div>
        </p>
      </PopupSection>
    </PopupSection>
    <div className="flex w-full items-center justify-between">
      <Button
        variant={"outline"}
        className="h-full w-full rounded-full p-1 shadow-sm hover:scale-100 hover:text-primary"
        asChild
      >
        <TwitterShareButton
          title={"@InstantPersonas is [your thoughts here]"}
          url={BASE_URL}
        >
          <span className="h-10 w-full whitespace-nowrap rounded-full border border-input bg-gradient-to-b from-blue-500 to-blue-500 p-2 px-10 font-semibold text-white transition-colors duration-300 ease-out hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-400">
            Tweet Now!
          </span>
        </TwitterShareButton>
      </Button>
    </div>
  </PopupTemplate>
);
