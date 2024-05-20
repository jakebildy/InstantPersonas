"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInstantPersonasUser } from "@/components/context/auth/user-context";

export default function Template({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useInstantPersonasUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);

  return (
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
  );
}
