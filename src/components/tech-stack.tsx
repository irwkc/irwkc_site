"use client";

import { motion } from "framer-motion";
import { TechTerminal } from "./tech-terminal";

export function TechStack() {
  return (
    <section id="tech-stack" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            Стек
          </motion.h2>
        </div>

        <TechTerminal />
      </div>
    </section>
  );
}
