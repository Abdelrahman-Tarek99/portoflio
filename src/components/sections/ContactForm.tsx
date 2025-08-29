"use client";
import { useState } from "react";
import { useContactForm } from "@/features/contact/useContactForm";
import { submitContact } from "@/features/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { WHATSAPP_PHONE } from "@/lib/constants";
import { buildWhatsAppLink } from "@/lib/utils";
import { CONTACT_FORM_CONSTANTS } from "./constants/contactForm.constants";

export default function ContactForm() {
  const t = useTranslations();
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
      fd.set(CONTACT_FORM_CONSTANTS.FIELD_NAMES.NAME, values.name);
      fd.set(CONTACT_FORM_CONSTANTS.FIELD_NAMES.EMAIL, values.email);
      fd.set(CONTACT_FORM_CONSTANTS.FIELD_NAMES.MESSAGE, values.message);
      const res = await submitContact(fd);
      if (res?.ok) {
        toast.success(t("contact.success"));
        const link = buildWhatsAppLink({
          phone: WHATSAPP_PHONE,
          name: values.name,
          context: CONTACT_FORM_CONSTANTS.WHATSAPP_CONFIG.CONTEXT,
          messages: {
            "whatsapp.prefill": t("whatsapp.prefill"),
            "whatsapp.prefill.anon": t("whatsapp.prefill.anon"),
          },
        });
        // Offer WhatsApp button
        toast(t("hero.cta.whatsapp"), {
          action: {
            label: t("hero.cta.whatsapp"),
            onClick: () =>
              window.open(
                link,
                CONTACT_FORM_CONSTANTS.WHATSAPP_CONFIG.TARGET,
                CONTACT_FORM_CONSTANTS.WHATSAPP_CONFIG.REL
              ),
          },
        });
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className={`${CONTACT_FORM_CONSTANTS.FORM_CONFIG.SPACE_Y} ${CONTACT_FORM_CONSTANTS.FORM_CONFIG.MAX_WIDTH}`}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div
        className={`${CONTACT_FORM_CONSTANTS.FORM_CONFIG.GRID_GAP} ${CONTACT_FORM_CONSTANTS.FORM_CONFIG.GRID_COLS}`}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor={CONTACT_FORM_CONSTANTS.FIELD_NAMES.NAME}
            className={CONTACT_FORM_CONSTANTS.LABEL_STYLING.CLASSES}
          >
            {t("contact.name")}
          </label>
          <Input
            id={CONTACT_FORM_CONSTANTS.FIELD_NAMES.NAME}
            disabled={loading}
            {...form.register(CONTACT_FORM_CONSTANTS.FIELD_NAMES.NAME)}
          />
          {form.formState.errors.name && (
            <p className={CONTACT_FORM_CONSTANTS.ERROR_STYLING.TEXT_CLASSES}>
              {form.formState.errors.name.message as string}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor={CONTACT_FORM_CONSTANTS.FIELD_NAMES.EMAIL}
            className={CONTACT_FORM_CONSTANTS.LABEL_STYLING.CLASSES}
          >
            {t("contact.email")}
          </label>
          <Input
            id={CONTACT_FORM_CONSTANTS.FIELD_NAMES.EMAIL}
            type={CONTACT_FORM_CONSTANTS.INPUT_TYPES.EMAIL}
            disabled={loading}
            {...form.register(CONTACT_FORM_CONSTANTS.FIELD_NAMES.EMAIL)}
          />
          {form.formState.errors.email && (
            <p className={CONTACT_FORM_CONSTANTS.ERROR_STYLING.TEXT_CLASSES}>
              {form.formState.errors.email.message as string}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label
          htmlFor={CONTACT_FORM_CONSTANTS.FIELD_NAMES.MESSAGE}
          className={CONTACT_FORM_CONSTANTS.LABEL_STYLING.CLASSES}
        >
          {t("contact.message")}
        </label>
        <Textarea
          id={CONTACT_FORM_CONSTANTS.FIELD_NAMES.MESSAGE}
          rows={CONTACT_FORM_CONSTANTS.TEXTAREA_CONFIG.ROWS}
          disabled={loading}
          {...form.register(CONTACT_FORM_CONSTANTS.FIELD_NAMES.MESSAGE)}
        />
        {form.formState.errors.message && (
          <p className={CONTACT_FORM_CONSTANTS.ERROR_STYLING.TEXT_CLASSES}>
            {form.formState.errors.message.message as string}
          </p>
        )}
      </div>
      <button
        type={CONTACT_FORM_CONSTANTS.INPUT_TYPES.SUBMIT}
        disabled={loading}
        className={CONTACT_FORM_CONSTANTS.BUTTON_CONFIG.CLASSES}
      >
        {t("contact.submit")}
      </button>
    </form>
  );
}
