"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStytchUser } from "@stytch/nextjs";

export default function Template({ children }: { children: React.ReactNode }) {
  const { user, isInitialized } = useStytchUser();
  const router = useRouter();

  // If the Stytch SDK no longer has a User then redirect to login; for example after logging out.
  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/");
    }
  }, [user, isInitialized, router]);

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
      <ScrollArea className="h-[calc(100vh-58px)]">{children}</ScrollArea>
    </motion.div>
  );
}
