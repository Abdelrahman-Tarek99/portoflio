import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppLink({
  phone,
  name,
  context,
  messages,
}: {
  phone: string;
  name?: string;
  context?: string;
  messages: Record<string, string>;
}) {
  const key = name ? "whatsapp.prefill" : "whatsapp.prefill.anon";
  let template = messages[key] || "";
  if (name) template = template.replace("{name}", name);
  const text = context ? `${template} ${context}` : template;
  const url = `https://wa.me/${encodeURIComponent(
    phone
  )}?text=${encodeURIComponent(text)}`;
  return url;
}
