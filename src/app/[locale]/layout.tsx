import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "@/features/i18n/getMessages";
import { DEFAULT_LOCALE, type AppLocale } from "@/features/i18n/locales";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/ui/Navbar";
import "./scroll.css"; // For scroll-margin-top

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const messages = await getMessages(locale as AppLocale);
  return {
    title: messages.meta.title as string,
    description: messages.meta.description as string,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (raw as AppLocale) || DEFAULT_LOCALE;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div dir={dir} data-locale={locale}>
        <Navbar />
        <div className="section-offset">{children}</div>
        <Toaster richColors position="top-center" />
      </div>
    </NextIntlClientProvider>
  );
}
