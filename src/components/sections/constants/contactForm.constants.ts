// ContactForm component constants
export const CONTACT_FORM_CONSTANTS = {
  // Form field names
  FIELD_NAMES: {
    NAME: "name",
    EMAIL: "email",
    MESSAGE: "message",
  },

  // Form configuration
  FORM_CONFIG: {
    MAX_WIDTH: "max-w-xl",
    GRID_GAP: "gap-4",
    GRID_COLS: "sm:grid-cols-2",
    SPACE_Y: "space-y-4",
  },

  // Input types
  INPUT_TYPES: {
    EMAIL: "email",
    SUBMIT: "submit",
  },

  // Textarea configuration
  TEXTAREA_CONFIG: {
    ROWS: 5,
  },

  // Button configuration
  BUTTON_CONFIG: {
    CLASSES:
      "inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50",
  },

  // Error styling
  ERROR_STYLING: {
    TEXT_CLASSES: "text-sm text-red-600",
  },

  // Label styling
  LABEL_STYLING: {
    CLASSES: "text-sm font-medium",
  },

  // WhatsApp link configuration
  WHATSAPP_CONFIG: {
    TARGET: "_blank",
    REL: "noopener,noreferrer",
    CONTEXT: "",
  },
} as const;

// Type for locale
export type LocaleType = "en" | "ar";
