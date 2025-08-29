// components/sections/ContactSection.tsx
"use client";

import React, { ReactNode } from "react";
import ContactForm from "./ContactForm";
import { Button } from "../ui/button";
import { MessageCircle, ExternalLink } from "lucide-react";

type Props = {
  title?: string;
  upworkUrl?: string;
  whatsappRaw?: string; // e.g. "+021114443609"
  className?: string;
  /** Optional: override the left side with a custom form */
  children?: ReactNode;
};

function toWhatsAppLink(raw: string) {
  // wa.me expects digits-only (E.164 without +)
  const digits = (raw ?? "").replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export default function ContactSection({
  title = "Contact",
  upworkUrl = "https://www.upwork.com/freelancers/~01ca703b4b73db27c1?mp_source=share",
  whatsappRaw = "+021114443609",
  className = "",
  children,
}: Props) {
  const waLink = toWhatsAppLink(whatsappRaw);

  return (
    <section
      id="contact"
      className={`container mx-auto px-4 lg:px-6 pb-24 ${className}`}
    >
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* LEFT: your form (default: ContactForm) */}
        <div className="space-y-4">{children ?? <ContactForm />}</div>

        {/* RIGHT: CTAs */}
        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="text-lg font-semibold">Prefer a quick chat?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You can message me on WhatsApp or hire me on Upwork.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="h-11 px-4 bg-[#25D366] text-black hover:bg-[#1ebe57]"
              >
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message me on WhatsApp"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message on WhatsApp
                </a>
              </Button>

              <Button asChild variant="outline" className="h-11 px-4">
                <a
                  href={upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View my Upwork profile"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Upwork Profile
                </a>
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              I usually reply within a few hours (EET).
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
