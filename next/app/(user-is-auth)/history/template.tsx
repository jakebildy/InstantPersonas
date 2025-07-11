"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { PreventNotAuth } from "@/components/page-specific/prevent-no-auth";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreventNotAuth />
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.9, rotateY: 5 }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
        }}
        transition={{ type: "spring", duration: 1 }}
      >
        <ScrollArea className="h-[calc(100dvh-2px)]">{children}</ScrollArea>
      </motion.div>
    </>
  );
}
