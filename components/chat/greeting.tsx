"use client";

import { motion } from "framer-motion";

export function Greeting({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 pt-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl font-semibold tracking-tight md:text-3xl"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 text-sm text-muted-foreground"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
