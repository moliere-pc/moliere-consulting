"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-colors duration-300",
              isOpen ? "border-brand-300 shadow-soft" : "border-ink-100"
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
            >
              <span className="text-base font-bold text-ink-900 sm:text-lg">
                {item.q}
              </span>
              <span
                className={cn(
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-smooth",
                  isOpen ? "rotate-45 bg-brand-600 text-white" : "bg-ink-50 text-ink-700"
                )}
              >
                <Plus size={18} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500 sm:px-6 sm:pb-6 sm:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
