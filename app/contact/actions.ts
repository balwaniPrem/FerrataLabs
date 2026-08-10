"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

export type FormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone", string>>;
  values?: { name: string; email: string; phone: string };
};

/**
 * Free-domain list for the "business email" requirement. Deliberately short — the goal
 * is to catch the obvious personal addresses, not to police every provider on earth.
 */
const FREE_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "hotmail.co.uk",
  "live.com",
  "msn.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mail.com",
  "gmx.com",
  "proton.me",
  "protonmail.com",
  "yandex.com",
  "zoho.com",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(name: string, email: string, phone: string) {
  const fieldErrors: FormState["fieldErrors"] = {};

  if (name.length < 2) fieldErrors.name = "Please enter your full name.";
  else if (name.length > 120) fieldErrors.name = "That name is too long.";

  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  } else if (FREE_DOMAINS.has(email.split("@")[1]?.toLowerCase() ?? "")) {
    fieldErrors.email = "Please use your work email address.";
  }

  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length < 7 || digits.length > 15) {
    fieldErrors.phone = "Please enter a phone number we can reach you on.";
  }

  return fieldErrors;
}

async function deliver(payload: { name: string; email: string; phone: string }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM;

  const text = [
    "New discovery call request — ferratalabs.ai",
    "",
    `Name:  ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
  ].join("\n");

  if (key && from) {
    // Endpoint is overridable so submissions can be routed through an egress proxy
    // where corporate networking requires it.
    const endpoint = process.env.RESEND_ENDPOINT ?? "https://api.resend.com/emails";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: payload.email,
        subject: `Discovery call request — ${payload.name}`,
        text,
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    }
    return;
  }

  // No provider configured. In production that is a hard failure — we will not tell
  // someone we received their details when nothing was actually sent.
  if (process.env.NODE_ENV === "production") {
    throw new Error("No transactional email provider configured");
  }

  // Development fallback so the form is testable before the provider exists.
  const file = path.join(process.cwd(), ".submissions.jsonl");
  await fs.appendFile(
    file,
    JSON.stringify({ ...payload, at: new Date().toISOString() }) + "\n",
    "utf8",
  );
  console.warn(`[contact] RESEND_API_KEY unset — submission written to ${file}`);
}

export async function submitContact(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot. Bots fill every field they find; people never see this one.
  if ((formData.get("company_website") as string)?.trim()) {
    return { ok: true };
  }

  const name = ((formData.get("name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const values = { name, email, phone };

  const fieldErrors = validate(name, email, phone);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, values };
  }

  try {
    await deliver(values);
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return {
      ok: false,
      error: `Something went wrong sending that. Please email ${site.email} directly and we'll pick it up.`,
      values,
    };
  }

  return { ok: true };
}
