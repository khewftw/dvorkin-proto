"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { LeadModal } from "@/components/LeadModal";

export function Cta() {
  const [leadOpen, setLeadOpen] = useState(false);

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-transparent px-4 py-16 text-center text-white">
      <div className="relative z-10" data-reveal>
        <h2 className="font-script text-[clamp(42px,8vw,92px)] font-bold italic leading-[0.95]">
          Приходите
          <br />
          <span className="text-white [text-shadow:0_0_16px_rgba(255,255,255,0.65),0_0_36px_rgba(43,103,243,0.95)]">
            тренироваться
          </span>
        </h2>
        <div className="mt-8 flex flex-col items-center gap-6">
          <Button
            type="button"
            variant="invertedGlow"
            onClick={() => setLeadOpen(true)}
          >
            Забронировать
          </Button>
          <a
            href="tel:+73912369333"
            className="phone-xl font-display font-semibold tracking-[-0.02em]"
          >
            +7 (391) 236-93-33
          </a>
        </div>
      </div>
      <AnimatePresence>
        {leadOpen ? (
          <LeadModal
            tariff="Запись на тренировку"
            onClose={() => setLeadOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
