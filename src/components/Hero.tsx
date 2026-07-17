import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1.5"
    >
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white select-none">
        Welcome back 👋
      </h2>
      <p className="text-xs sm:text-sm text-zinc-400">
        Here&apos;s what&apos;s happening with your links today.
      </p>
    </motion.div>
  );
}
