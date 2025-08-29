// Hero component constants
export const HERO_CONSTANTS = {
  // Typing animation texts
  TYPING_TEXTS: [
    "Computer Eng. Graduate",
    "Tech Enthusiast",
    "I build fast, accessible web apps.",
  ],

  // Animation timing
  ANIMATION_TIMING: {
    TYPE_DELAY: 100,
    PAUSE_DELAY: 2000,
    DELETE_DELAY: 50,
  },

  // Section configuration
  SECTION_CONFIG: {
    ID: "hero",
    CLASSES: "min-h-screen flex items-center justify-center px-4 py-16",
  },

  // Container configuration
  CONTAINER_CONFIG: {
    CLASSES:
      "container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
  },

  // Text content configuration
  TEXT_CONFIG: {
    SPACE_Y: "space-y-8",
    TEXT_LEFT: "text-left",
  },

  // Title configuration
  TITLE_CONFIG: {
    CLASSES: "text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight",
    FOREGROUND: "text-foreground",
    GRADIENT:
      "bg-gradient-to-r from-vanta-pink via-vanta-pink-light to-vanta-purple-lighter bg-clip-text text-transparent",
  },

  // Typing text configuration
  TYPING_CONFIG: {
    CONTAINER_CLASSES: "h-16 flex items-center",
    TEXT_CLASSES:
      "text-2xl sm:text-3xl lg:text-4xl text-foreground-secondary font-medium",
    CURSOR_CLASSES: "animate-pulse text-vanta-pink",
  },

  // CTA Button configuration
  CTA_CONFIG: {
    CONTAINER_CLASSES: "pt-4 flex justify-start",
    BUTTON_CLASSES:
      "inline-flex items-center gap-3 ltr:mr-4 rtl:ml-4 rounded-xl bg-gradient-to-r from-vanta-pink to-vanta-pink-light px-8 py-4 text-white font-semibold hover:from-vanta-pink-light hover:to-vanta-pink transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border-2 border-white hover:border-vanta-purple-lighter/50",
  },

  // Social links configuration
  SOCIAL_CONFIG: {
    CONTAINER_CLASSES: "flex items-center gap-6 pt-6",
    LINK_CLASSES:
      "p-4 rounded-full bg-vanta-purple-lighter/30 hover:bg-vanta-purple-lighter/50 transition-all duration-300 group hover:scale-110 border border-vanta-purple-lighter/20 hover:border-vanta-purple-lighter/40",
    ICON_CLASSES:
      "w-7 h-7 text-foreground-secondary group-hover:text-vanta-pink transition-colors",
  },

  // Animation container configuration
  ANIMATION_CONFIG: {
    CONTAINER_CLASSES: "flex justify-center lg:justify-end",
    WRAPPER_CLASSES: "w-full max-w-md lg:max-w-lg",
    LOTTIE_CLASSES: "w-full h-auto relative z-10",
    GLOW_CLASSES:
      "absolute inset-0 bg-gradient-to-br from-vanta-pink/10 to-vanta-purple-lighter/10 rounded-2xl blur-3xl",
  },

  // Loading states
  LOADING_CONFIG: {
    CONTAINER_CLASSES:
      "w-full h-64 bg-vanta-purple-lighter/20 rounded-lg flex items-center justify-center border-2 border-dashed border-vanta-purple-lighter/30",
    CONTENT_CLASSES: "text-center text-foreground-secondary",
    ICON_CONTAINER_CLASSES:
      "w-16 h-16 bg-vanta-pink/20 rounded-full flex items-center justify-center mx-auto mb-2",
    SPINNER_CLASSES:
      "animate-spin w-8 h-8 border-2 border-vanta-pink border-t-transparent rounded-full mx-auto mb-2",
  },
} as const;
