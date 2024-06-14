import { ColorVariant, gradientLightVariants } from "@/components/variants";
import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon, GraduationCapIcon } from "lucide-react";
import React from "react";
import useMeasure from "react-use-measure";

type Props = {
  Icon?: LucideIcon;
  variant?: ColorVariant;
  title: string;
  footerText: string;
  description: React.ReactNode;
  children: React.ReactNode;
};

export default function QuizOuterLayout({
  Icon = GraduationCapIcon,
  variant = "blue",
  title,
  footerText,
  description,
  children,
}: Props) {
  const [ref, bounds] = useMeasure();

  return (
    <motion.div key={"quiz-outer-layout"} layoutId="quiz-outer-layout">
      <div className="flex items-center gap-2">
        <Icon className="text-gray-600" />
        <h2 className="pb-1 text-lg font-bold text-gray-700">{title}</h2>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      <motion.div
        animate={{ height: bounds.height }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="relative my-4"
      >
        <div className="multi-step-inner" ref={ref}>
          <motion.div
            key={"quiz-outer-layout-container"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            layoutId="quiz-outer-layout-container"
            className={gradientLightVariants({
              variant: variant,
              className:
                "relative grid min-h-[600px] place-items-center rounded-2xl border shadow-sm",
            })}
          >
            <AnimatePresence mode="wait" initial={false}>
              {children}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      <p className="text-center text-sm text-muted-foreground">{footerText}</p>
    </motion.div>
  );
}
