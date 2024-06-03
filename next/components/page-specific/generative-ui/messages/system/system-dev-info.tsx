"use client";
import { cn, IS_TEST_DEV_ENV } from "@/lib/utils";
import Image from "next/image";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { HTMLAttributes, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fixJson } from "@/lib/fix-json";

export interface SystemComponentProps extends HTMLAttributes<HTMLDivElement> {
  message: ReactNode;
  state: any;
}

export const SystemDevInfo = ({
  message,
  state,
  className,
  ...Props
}: SystemComponentProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!IS_TEST_DEV_ENV) return null;

  return (
    <div className={cn("flex gap-2 w-full pt-2", className)} {...Props}>
      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => setExpanded((p) => !p)}
      >
        <InfoCircledIcon />
      </Button>
      <motion.div
        animate={{
          height: expanded ? "auto" : 0,
        }}
        transition={{ duration: 0.3, type: "spring" }}
        className="overflow-hidden flex-1 w-full"
      >
        <div className="flex flex-col gap-2 w-full overflow-hidden box-border">
          <div className="p-2 w-full bg-white border rounded-md whitespace-pre-wrap">
            {message}
          </div>
          <div className="p-2 w-full bg-white border rounded-md whitespace-pre-wrap flex-1">
            {JSON.stringify(JSON.parse(fixJson(state)), null, 2)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
