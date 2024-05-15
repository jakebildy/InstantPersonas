import { ColorVariant } from "@/components/variants";
import { motion } from "framer-motion";
import { LaughIcon } from "lucide-react";

export function EndSurvey({ variant }: { variant?: ColorVariant }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <LaughIcon className="text-green-500" />
        <h2 className="text-lg font-bold text-gray-700">
          Thank you for your feedback!
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        Your feedback is valuable to us. We appreciate your time.
      </p>
    </motion.div>
  );
}
