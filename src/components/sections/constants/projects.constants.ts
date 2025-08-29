// Projects component constants
export const PROJECTS_CONSTANTS = {
  // Section configuration
  SECTION_CONFIG: {
    ID: "projects",
    CLASSES: "space-y-6",
  },

  // Title configuration
  TITLE_CONFIG: {
    CLASSES: "text-2xl font-semibold",
  },

  // Grid configuration
  GRID_CONFIG: {
    CLASSES: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
    PERSPECTIVE: 1000,
  },

  // Media queries
  MEDIA_QUERIES: {
    SM: "(min-width: 640px)",
    LG: "(min-width: 1024px)",
  },

  // Animation configuration
  ANIMATION_CONFIG: {
    // Item animation variants
    ITEM_VARIANTS: {
      HIDDEN: { opacity: 0, y: 22, scale: 0.96 },
      SHOW: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] },
      },
    },

    // Title animation
    TITLE_ANIMATION: {
      INITIAL: { opacity: 0, y: 10 },
      WHILE_IN_VIEW: { opacity: 1, y: 0 },
      TRANSITION: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
    },

    // Card animation
    CARD_ANIMATION: {
      INITIAL: "hidden",
      WHILE_IN_VIEW: "show",
      WHILE_HOVER: { y: -6, scale: 1.02 },
      WHILE_TAP: { scale: 0.995 },
    },

    // Sheen animation
    SHEEN_ANIMATION: {
      INITIAL: { x: "-120%" },
      WHILE_HOVER: { x: "120%" },
      TRANSITION: { duration: 0.9, ease: "easeOut" },
    },
  },

  // Viewport configuration
  VIEWPORT_CONFIG: {
    ONCE: true,
    AMOUNT: 0.35,
    MARGIN: "0px 0px -10% 0px",
  },

  // Card configuration
  CARD_CONFIG: {
    CLASSES:
      "group relative rounded-xl border bg-card overflow-hidden transition-shadow will-change-transform",
    CONTENT_PADDING: "p-4",
    COVER_ASPECT: "aspect-video",
    COVER_CLASSES: "relative aspect-video bg-muted",
  },

  // Cover image configuration
  COVER_CONFIG: {
    FALLBACK_TEXT: "No preview",
    FALLBACK_CLASSES:
      "absolute inset-0 grid place-items-center text-muted-foreground text-xs",
    IMAGE_CLASSES: "object-cover",
  },

  // Sheen effect configuration
  SHEEN_CONFIG: {
    CONTAINER_CLASSES:
      "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100",
    GRADIENT_CLASSES:
      "absolute -inset-x-1/2 -inset-y-full rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent",
  },

  // Content styling
  CONTENT_STYLING: {
    TITLE_CLASSES: "font-medium",
    STARS_CLASSES: "text-xs text-muted-foreground",
    DESCRIPTION_CLASSES:
      "text-sm text-muted-foreground mt-2 line-clamp-3 min-h-10",
    TAGS_CONTAINER: "mt-3 flex flex-wrap items-center gap-2",
  },

  // Language tag configuration
  LANGUAGE_TAG_CONFIG: {
    CLASSES:
      "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs",
    DOT_CLASSES: "inline-block h-2 w-2 rounded-full",
    FALLBACK_COLOR: "#888",
  },

  // Topic tag configuration
  TOPIC_TAG_CONFIG: {
    CLASSES: "rounded-md border px-2 py-0.5 text-xs",
    MAX_DISPLAY: 3,
  },

  // Glow effect configuration
  GLOW_CONFIG: {
    RING_CLASSES:
      "pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[var(--glow)]/0 transition-all duration-300 group-hover:ring-2 group-hover:ring-[var(--glow)]/40",
    SHADOW_CLASSES:
      "pointer-events-none absolute inset-0 shadow-none transition-shadow duration-300 group-hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)]",
    FALLBACK_COLOR: "#888888",
  },

  // Link configuration
  LINK_CONFIG: {
    TARGET: "_blank",
    REL: "noopener noreferrer",
  },

  // Empty state
  EMPTY_STATE: {
    TEXT: "No projects found.",
    CLASSES: "text-sm text-muted-foreground",
  },

  // Stagger configuration
  STAGGER_CONFIG: {
    ROW_DELAY_MULTIPLIER: 0.06,
  },
} as const;

// CSS custom property for glow color
export const GLOW_CSS_PROP = "--glow" as keyof React.CSSProperties;
