import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { PlusIcon } from "@radix-ui/react-icons";
import { IconInfoCircleFilled } from "@tabler/icons-react";

const InfoTooltip = ({ text }: { text: string }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button className="IconButton m-0 p-0 mb-3">
            <IconInfoCircleFilled className="text-green-600 h-5" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent text-start  text-xs"
            sideOffset={5}
          >
            {text.split(".").map((line, index) => (
              <p key={index}>{line}.</p>
            ))}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default InfoTooltip;
