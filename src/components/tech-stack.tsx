"use client";

import { motion } from "framer-motion";
import { TechTerminal } from "./tech-terminal";

export function TechStack() {
  return (
    <section id="tech-stack" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl"
          >
            Стек
          </motion.h2>
        </div>

        <TechTerminal />
      </div>
    </section>
  );
}
