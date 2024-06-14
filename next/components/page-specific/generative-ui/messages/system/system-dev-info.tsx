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
    <div className={cn("flex w-full gap-2 pt-2", className)} {...Props}>
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
        className="w-full flex-1 overflow-hidden"
      >
        <div className="box-border flex w-full flex-col gap-2 overflow-hidden">
          <div className="w-full whitespace-pre-wrap rounded-md border bg-white p-2">
            {message}
          </div>
          <div className="w-full flex-1 whitespace-pre-wrap rounded-md border bg-white p-2">
            {JSON.stringify(JSON.parse(fixJson(state)), null, 2)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
