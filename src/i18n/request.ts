import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE } from "@/features/i18n/locales";

export default getRequestConfig(async ({ locale }) => {
  const loc = (locale ?? DEFAULT_LOCALE) as "en" | "ar";
  return {
    locale: loc,
    messages: (await import(`../messages/${loc}.json`)).default,
  };
});
