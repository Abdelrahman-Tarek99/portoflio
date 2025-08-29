import "server-only";
import { SUPPORTED_LOCALES, type AppLocale } from "./locales";

export async function getMessages(locale: AppLocale) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return messages;
}
