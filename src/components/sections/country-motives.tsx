"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ServiceCard, type ServiceCardData } from "@/components/cards/service-card";

export type CountryGroup = {
  key: string;
  label: string;
  flag: string;
  services: ServiceCardData[];
};

export function CountryMotives({
  groups,
  selectLabel,
}: {
  groups: CountryGroup[];
  selectLabel: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div role="tablist" aria-label={selectLabel} className="flex justify-center">
        <div className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-ink-100 bg-white p-1.5 shadow-soft">
          {groups.map((g, i) => (
            <button
              key={g.key}
              role="tab"
              aria-selected={active === i}
              aria-controls={`panel-${g.key}`}
              id={`tab-${g.key}`}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 sm:text-base",
                active === i
                  ? "bg-brand-gradient text-white shadow-[0_12px_26px_-12px_rgba(205,7,30,0.8)]"
                  : "text-ink-500 hover:bg-ink-50 hover:text-ink-900"
              )}
            >
              <span className="text-xl" aria-hidden>
                {g.flag}
              </span>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Les deux panneaux restent dans le DOM (les 10 liens restent crawlables) */}
      <div className="relative">
      {groups.map((group, i) => (
        <motion.div
          key={group.key}
          id={`panel-${group.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${group.key}`}
          initial={false}
          animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
            active === i ? "block" : "pointer-events-none absolute inset-x-0 invisible"
          )}
          aria-hidden={active !== i}
        >
          {group.services.map((service) => (
            <ServiceCard key={service.slug} {...service} />
          ))}
        </motion.div>
      ))}
      </div>
    </div>
  );
}
