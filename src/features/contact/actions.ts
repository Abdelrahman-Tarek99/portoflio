"use server";
import { contactSchema } from "./schema";

export async function submitContact(prevState: any, formData: FormData) {
  const data = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    message: String(formData.get("message") || ""),
  };
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "invalid" };
  }
  // TODO: send email or persist
  return { ok: true };
}
