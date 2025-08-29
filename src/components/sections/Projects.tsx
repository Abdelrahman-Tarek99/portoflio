"use client";

import { useEffect, useState } from "react";
import { Project } from "@/features/projects/github";
import { LANGUAGE_COLOR } from "@/lib/constants";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

/** detect current grid columns to compute per-row stagger (1 | 2 | 3) */
function useGridCols() {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const sm = window.matchMedia("(min-width: 640px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(lg.matches ? 3 : sm.matches ? 2 : 1);
    update();
    sm.addEventListener("change", update);
    lg.addEventListener("change", update);
    return () => {
      sm.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);
  return cols;
}

const item: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function ProjectsSection({
  title,
  projects,
  starsLabel,
}: {
  title: string;
  projects: Project[];
  starsLabel: string;
}) {
  const cols = useGridCols();

  return (
    <section id="projects" className="space-y-6">
      <motion.h2
        className="text-2xl font-semibold"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {title}
      </motion.h2>

      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects found.</p>
      ) : (
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1000 }}
        >
          {projects.map((p, index) => {
            const href =
              p.demoUrl && p.demoUrl.trim().length > 0 ? p.demoUrl : p.codeUrl;

            // small stagger inside the currently visible row
            const rowDelay = 0.06 * (index % Math.max(cols, 1));

            return (
              <motion.a
                key={p.name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl border bg-card overflow-hidden transition-shadow will-change-transform"
                // reveal WHEN this card enters the viewport
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.35,
                  margin: "0px 0px -10% 0px",
                }}
                transition={{
                  duration: 0.42,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: rowDelay,
                }}
                // tasteful hover
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.995 }}
                style={
                  {
                    // glow color follows language (fallback gray)
                    ["--glow" as keyof React.CSSProperties]:
                      p.language && LANGUAGE_COLOR[p.language]
                        ? LANGUAGE_COLOR[p.language]
                        : "#888888",
                  } as React.CSSProperties
                }
              >
                {/* cover / preview */}
                <div className="relative aspect-video bg-muted">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-muted-foreground text-xs">
                      No preview
                    </div>
                  )}

                  {/* sheen sweep on hover */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                    initial={false}
                    animate={{}}
                  >
                    <motion.div
                      className="absolute -inset-x-1/2 -inset-y-full rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      initial={{ x: "-120%" }}
                      whileHover={{ x: "120%" }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>

                {/* content */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{p.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {p.stars} {starsLabel}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3 min-h-10">
                    {p.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {p.language && (
                      <span className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              LANGUAGE_COLOR[p.language] || "#888",
                          }}
                        />
                        {p.language}
                      </span>
                    )}
                    {p.topics?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* subtle glow ring + shadow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[var(--glow)]/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-[var(--glow)]/40" />
                <div className="pointer-events-none absolute inset-0 shadow-none transition-shadow duration-300 group-hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)]" />
              </motion.a>
            );
          })}
        </div>
      )}
    </section>
  );
}
