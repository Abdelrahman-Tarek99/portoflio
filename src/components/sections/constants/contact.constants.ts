// Contact component constants
export const CONTACT_CONSTANTS = {
  // Default values
  DEFAULTS: {
    TITLE: "Contact",
    UPWORK_URL:
      "https://www.upwork.com/freelancers/~01ca703b4b73db27c1?mp_source=share",
    WHATSAPP_RAW: "+021114443609",
    CLASS_NAME: "",
  },

  // Section configuration
  SECTION_CONFIG: {
    ID: "contact",
    CLASSES: "container mx-auto px-4 lg:px-6 pb-24",
    GRID_CLASSES: "grid gap-8 lg:grid-cols-2",
  },

  // Title styling
  TITLE_CONFIG: {
    CLASSES: "mb-6 text-2xl font-semibold",
  },

  // Content areas
  CONTENT_AREAS: {
    LEFT_CLASSES: "space-y-4",
    RIGHT_CLASSES: "space-y-4",
  },

  // CTA Card configuration
  CTA_CARD_CONFIG: {
    CLASSES: "rounded-xl border bg-card p-6",
    TITLE: "Prefer a quick chat?",
    DESCRIPTION: "You can message me on WhatsApp or hire me on Upwork.",
    FOOTER_TEXT: "I usually reply within a few hours (EET).",
  },

  // Button configuration
  BUTTON_CONFIG: {
    WHATSAPP: {
      CLASSES: "h-11 px-4 bg-[#25D366] text-black hover:bg-[#1ebe57]",
      LABEL: "Message on WhatsApp",
      ARIA_LABEL: "Message me on WhatsApp",
    },
    UPWORK: {
      CLASSES: "h-11 px-4",
      LABEL: "Upwork Profile",
      ARIA_LABEL: "View my Upwork profile",
    },
  },

  // Link configuration
  LINK_CONFIG: {
    TARGET: "_blank",
    REL: "noopener noreferrer",
  },

  // WhatsApp configuration
  WHATSAPP_CONFIG: {
    BASE_URL: "https://wa.me/",
  },

  // Text styling
  TEXT_STYLING: {
    DESCRIPTION: "mt-1 text-sm text-muted-foreground",
    FOOTER: "mt-3 text-xs text-muted-foreground",
    BUTTON_CONTAINER: "mt-5 flex flex-col sm:flex-row gap-3",
  },
} as const;

// WhatsApp link utility function
export function toWhatsAppLink(raw: string): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  return `${CONTACT_CONSTANTS.WHATSAPP_CONFIG.BASE_URL}${digits}`;
}
