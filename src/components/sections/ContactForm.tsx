"use client";
import { useState } from "react";
import { useContactForm } from "@/features/contact/useContactForm";
import { submitContact } from "@/features/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import { WHATSAPP_PHONE } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";

export default function ContactForm() {
  const t = useTranslations();
  const locale = useLocale() as "en" | "ar";
  const form = useContactForm();
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: {
    name: string;
    email: string;
    message: string;
  }) {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.set("name", values.name);
      fd.set("email", values.email);
      fd.set("message", values.message);
      const res = await submitContact(null, fd);
      if (res?.ok) {
        toast.success(t("contact.success"));
        const link = buildWhatsAppLink({
          phone: WHATSAPP_PHONE,
          name: values.name,
          locale,
          context: "",
          messages: {
            "whatsapp.prefill": t("whatsapp.prefill"),
            "whatsapp.prefill.anon": t("whatsapp.prefill.anon"),
          },
        });
        // Offer WhatsApp button
        toast(t("hero.cta.whatsapp"), {
          action: {
            label: t("hero.cta.whatsapp"),
            onClick: () => window.open(link, "_blank", "noopener,noreferrer"),
          },
        });
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-4 max-w-xl" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            {t("contact.name")}
          </label>
          <Input id="name" disabled={loading} {...form.register("name")} />
          {form.formState.errors.name && (
            <p className="text-sm text-red-600">
              {form.formState.errors.name.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            {t("contact.email")}
          </label>
          <Input
            id="email"
            type="email"
            disabled={loading}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-600">
              {form.formState.errors.email.message as string}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium">
          {t("contact.message")}
        </label>
        <Textarea
          id="message"
          rows={5}
          disabled={loading}
          {...form.register("message")}
        />
        {form.formState.errors.message && (
          <p className="text-sm text-red-600">
            {form.formState.errors.message.message as string}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
      >
        {t("contact.submit")}
      </button>
    </form>
  );
}
