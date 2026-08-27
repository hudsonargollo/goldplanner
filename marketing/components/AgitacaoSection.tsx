"use client";

import { motion } from "framer-motion";
import SectionBlob from "@/components/SectionBlob";
import GoldenRibbons from "@/components/GoldenRibbons";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function AgitacaoSection() {
  return (
    <section className="relative bg-ivory pt-12 pb-12 sm:pt-16 sm:pb-16 overflow-hidden">
      <div className="absolute inset-0 bp-dots opacity-60 mask-fade" aria-hidden />
      <div className="absolute inset-0 grain-light mask-fade" aria-hidden />
      <SectionBlob tone="sand" className="-right-20 -top-24 h-96 w-96" />

      {/* Fourth pass: dropped the figurative illustration (a stockyard of
          identical columns, standing in for "generic, off-the-shelf") for a
          plain circuit-line mesh — the sleek/techy read doesn't need a
          literal metaphor image, and a quiet grid reads as "systems" on its
          own alongside GoldenRibbons. */}
      <div className="pointer-events-none absolute -right-[6%] top-1/2 h-[90%] w-[46%] -translate-y-1/2 bp-lines opacity-[0.5] mask-fade-corner-soft" aria-hidden />
      <GoldenRibbons className="pointer-events-none absolute -right-[4%] top-1/2 h-[80%] w-[58%] -translate-y-1/2 opacity-50" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-balance text-2xl sm:text-3xl leading-snug text-ink/70"
          >
            O mercado oferece ferramentas, sistemas e plataformas.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-balance border-l-2 border-green pl-6 text-3xl sm:text-4xl font-bold leading-snug tracking-display text-ink"
          >
            Mas nada disso foi feito sob medida para a sua empresa.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
            className="label-tech pt-4"
          >
            Da identificação do gargalo à construção de um novo ativo
          </motion.p>
        </div>
      </div>
    </section>
  );
}
