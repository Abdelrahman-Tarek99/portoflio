"use client";

import { useEffect, useState } from "react";
import { Project } from "@/features/projects/github";
import { LANGUAGE_COLOR } from "@/lib/constants";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  PROJECTS_CONSTANTS,
  GLOW_CSS_PROP,
} from "./constants/projects.constants";

/** detect current grid columns to compute per-row stagger (1 | 2 | 3) */
function useGridCols() {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const sm = window.matchMedia(PROJECTS_CONSTANTS.MEDIA_QUERIES.SM);
    const lg = window.matchMedia(PROJECTS_CONSTANTS.MEDIA_QUERIES.LG);
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

const item: Variants = PROJECTS_CONSTANTS.ANIMATION_CONFIG.ITEM_VARIANTS;

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
    <section
      id={PROJECTS_CONSTANTS.SECTION_CONFIG.ID}
      className={PROJECTS_CONSTANTS.SECTION_CONFIG.CLASSES}
    >
      <motion.h2
        className={PROJECTS_CONSTANTS.TITLE_CONFIG.CLASSES}
        initial={PROJECTS_CONSTANTS.ANIMATION_CONFIG.TITLE_ANIMATION.INITIAL}
        whileInView={
          PROJECTS_CONSTANTS.ANIMATION_CONFIG.TITLE_ANIMATION.WHILE_IN_VIEW
        }
        viewport={{ once: true, amount: 0.3 }}
        transition={
          PROJECTS_CONSTANTS.ANIMATION_CONFIG.TITLE_ANIMATION.TRANSITION
        }
      >
        {title}
      </motion.h2>

      {projects.length === 0 ? (
        <p className={PROJECTS_CONSTANTS.EMPTY_STATE.CLASSES}>
          {PROJECTS_CONSTANTS.EMPTY_STATE.TEXT}
        </p>
      ) : (
        <div
          className={PROJECTS_CONSTANTS.GRID_CONFIG.CLASSES}
          style={{ perspective: PROJECTS_CONSTANTS.GRID_CONFIG.PERSPECTIVE }}
        >
          {projects.map((p, index) => {
            const href =
              p.demoUrl && p.demoUrl.trim().length > 0 ? p.demoUrl : p.codeUrl;

            // small stagger inside the currently visible row
            const rowDelay =
              PROJECTS_CONSTANTS.STAGGER_CONFIG.ROW_DELAY_MULTIPLIER *
              (index % Math.max(cols, 1));

            return (
              <motion.a
                key={p.name}
                href={href}
                target={PROJECTS_CONSTANTS.LINK_CONFIG.TARGET}
                rel={PROJECTS_CONSTANTS.LINK_CONFIG.REL}
                className={PROJECTS_CONSTANTS.CARD_CONFIG.CLASSES}
                // reveal WHEN this card enters the viewport
                variants={item}
                initial={
                  PROJECTS_CONSTANTS.ANIMATION_CONFIG.CARD_ANIMATION.INITIAL
                }
                whileInView={
                  PROJECTS_CONSTANTS.ANIMATION_CONFIG.CARD_ANIMATION
                    .WHILE_IN_VIEW
                }
                viewport={{
                  once: PROJECTS_CONSTANTS.VIEWPORT_CONFIG.ONCE,
                  amount: PROJECTS_CONSTANTS.VIEWPORT_CONFIG.AMOUNT,
                  margin: PROJECTS_CONSTANTS.VIEWPORT_CONFIG.MARGIN,
                }}
                transition={{
                  duration: 0.42,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: rowDelay,
                }}
                // tasteful hover
                whileHover={
                  PROJECTS_CONSTANTS.ANIMATION_CONFIG.CARD_ANIMATION.WHILE_HOVER
                }
                whileTap={
                  PROJECTS_CONSTANTS.ANIMATION_CONFIG.CARD_ANIMATION.WHILE_TAP
                }
                style={
                  {
                    // glow color follows language (fallback gray)
                    [GLOW_CSS_PROP]:
                      p.language && LANGUAGE_COLOR[p.language]
                        ? LANGUAGE_COLOR[p.language]
                        : PROJECTS_CONSTANTS.GLOW_CONFIG.FALLBACK_COLOR,
                  } as React.CSSProperties
                }
              >
                {/* cover / preview */}
                <div className={PROJECTS_CONSTANTS.CARD_CONFIG.COVER_CLASSES}>
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className={PROJECTS_CONSTANTS.COVER_CONFIG.IMAGE_CLASSES}
                    />
                  ) : (
                    <div
                      className={
                        PROJECTS_CONSTANTS.COVER_CONFIG.FALLBACK_CLASSES
                      }
                    >
                      {PROJECTS_CONSTANTS.COVER_CONFIG.FALLBACK_TEXT}
                    </div>
                  )}

                  {/* sheen sweep on hover */}
                  <motion.div
                    className={
                      PROJECTS_CONSTANTS.SHEEN_CONFIG.CONTAINER_CLASSES
                    }
                    initial={false}
                    animate={{}}
                  >
                    <motion.div
                      className={
                        PROJECTS_CONSTANTS.SHEEN_CONFIG.GRADIENT_CLASSES
                      }
                      initial={
                        PROJECTS_CONSTANTS.ANIMATION_CONFIG.SHEEN_ANIMATION
                          .INITIAL
                      }
                      whileHover={
                        PROJECTS_CONSTANTS.ANIMATION_CONFIG.SHEEN_ANIMATION
                          .WHILE_HOVER
                      }
                      transition={
                        PROJECTS_CONSTANTS.ANIMATION_CONFIG.SHEEN_ANIMATION
                          .TRANSITION
                      }
                    />
                  </motion.div>
                </div>

                {/* content */}
                <div className={PROJECTS_CONSTANTS.CARD_CONFIG.CONTENT_PADDING}>
                  <div className="flex items-center justify-between">
                    <h3
                      className={
                        PROJECTS_CONSTANTS.CONTENT_STYLING.TITLE_CLASSES
                      }
                    >
                      {p.name}
                    </h3>
                    <span
                      className={
                        PROJECTS_CONSTANTS.CONTENT_STYLING.STARS_CLASSES
                      }
                    >
                      {p.stars} {starsLabel}
                    </span>
                  </div>

                  <p
                    className={
                      PROJECTS_CONSTANTS.CONTENT_STYLING.DESCRIPTION_CLASSES
                    }
                  >
                    {p.description}
                  </p>

                  <div
                    className={
                      PROJECTS_CONSTANTS.CONTENT_STYLING.TAGS_CONTAINER
                    }
                  >
                    {p.language && (
                      <span
                        className={
                          PROJECTS_CONSTANTS.LANGUAGE_TAG_CONFIG.CLASSES
                        }
                      >
                        <span
                          className={
                            PROJECTS_CONSTANTS.LANGUAGE_TAG_CONFIG.DOT_CLASSES
                          }
                          style={{
                            backgroundColor:
                              LANGUAGE_COLOR[p.language] ||
                              PROJECTS_CONSTANTS.LANGUAGE_TAG_CONFIG
                                .FALLBACK_COLOR,
                          }}
                        />
                        {p.language}
                      </span>
                    )}
                    {p.topics
                      ?.slice(
                        0,
                        PROJECTS_CONSTANTS.TOPIC_TAG_CONFIG.MAX_DISPLAY
                      )
                      .map((t) => (
                        <span
                          key={t}
                          className={
                            PROJECTS_CONSTANTS.TOPIC_TAG_CONFIG.CLASSES
                          }
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                </div>

                {/* subtle glow ring + shadow on hover */}
                <div className={PROJECTS_CONSTANTS.GLOW_CONFIG.RING_CLASSES} />
                <div
                  className={PROJECTS_CONSTANTS.GLOW_CONFIG.SHADOW_CLASSES}
                />
              </motion.a>
            );
          })}
        </div>
      )}
    </section>
  );
}
