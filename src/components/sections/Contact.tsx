// components/sections/ContactSection.tsx
"use client";

import React, { ReactNode } from "react";
import ContactForm from "./ContactForm";
import { Button } from "../ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";
import {
  CONTACT_CONSTANTS,
  toWhatsAppLink,
} from "./constants/contact.constants";

type Props = {
  title?: string;
  upworkUrl?: string;
  whatsappRaw?: string; // e.g. "+021114443609"
  className?: string;
  /** Optional: override the left side with a custom form */
  children?: ReactNode;
};

export default function ContactSection({
  title = CONTACT_CONSTANTS.DEFAULTS.TITLE,
  upworkUrl = CONTACT_CONSTANTS.DEFAULTS.UPWORK_URL,
  whatsappRaw = CONTACT_CONSTANTS.DEFAULTS.WHATSAPP_RAW,
  className = CONTACT_CONSTANTS.DEFAULTS.CLASS_NAME,
  children,
}: Props) {
  const waLink = toWhatsAppLink(whatsappRaw);

  return (
    <section
      id={CONTACT_CONSTANTS.SECTION_CONFIG.ID}
      className={`${CONTACT_CONSTANTS.SECTION_CONFIG.CLASSES} ${className}`}
    >
      <h2 className={CONTACT_CONSTANTS.TITLE_CONFIG.CLASSES}>{title}</h2>

      <div className={CONTACT_CONSTANTS.SECTION_CONFIG.GRID_CLASSES}>
        {/* LEFT: your form (default: ContactForm) */}
        <div className={CONTACT_CONSTANTS.CONTENT_AREAS.LEFT_CLASSES}>
          {children ?? <ContactForm />}
        </div>

        {/* RIGHT: CTAs */}
        <aside className={CONTACT_CONSTANTS.CONTENT_AREAS.RIGHT_CLASSES}>
          <div className={CONTACT_CONSTANTS.CTA_CARD_CONFIG.CLASSES}>
            <h3 className="text-lg font-semibold">
              {CONTACT_CONSTANTS.CTA_CARD_CONFIG.TITLE}
            </h3>
            <p className={CONTACT_CONSTANTS.TEXT_STYLING.DESCRIPTION}>
              {CONTACT_CONSTANTS.CTA_CARD_CONFIG.DESCRIPTION}
            </p>

            <div className={CONTACT_CONSTANTS.TEXT_STYLING.BUTTON_CONTAINER}>
              <Button
                asChild
                className={CONTACT_CONSTANTS.BUTTON_CONFIG.WHATSAPP.CLASSES}
              >
                <a
                  href={waLink}
                  target={CONTACT_CONSTANTS.LINK_CONFIG.TARGET}
                  rel={CONTACT_CONSTANTS.LINK_CONFIG.REL}
                  aria-label={
                    CONTACT_CONSTANTS.BUTTON_CONFIG.WHATSAPP.ARIA_LABEL
                  }
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {CONTACT_CONSTANTS.BUTTON_CONFIG.WHATSAPP.LABEL}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className={CONTACT_CONSTANTS.BUTTON_CONFIG.UPWORK.CLASSES}
              >
                <a
                  href={upworkUrl}
                  target={CONTACT_CONSTANTS.LINK_CONFIG.TARGET}
                  rel={CONTACT_CONSTANTS.LINK_CONFIG.REL}
                  aria-label={CONTACT_CONSTANTS.BUTTON_CONFIG.UPWORK.ARIA_LABEL}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {CONTACT_CONSTANTS.BUTTON_CONFIG.UPWORK.LABEL}
                </a>
              </Button>
            </div>

            <p className={CONTACT_CONSTANTS.TEXT_STYLING.FOOTER}>
              {CONTACT_CONSTANTS.CTA_CARD_CONFIG.FOOTER_TEXT}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
