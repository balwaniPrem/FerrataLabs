"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

export type FormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "company" | "phone", string>>;
  values?: {
    name: string;
    email: string;
    company: string;
    phone: string;
    /** "US" or "CA". Both dial +1; the value records which market. */
    phoneCountry: string;
    /** Optional. Never validated beyond a length cap. */
    notes: string;
  };
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

/** Notes are not validated: they are optional and already length-capped by the caller. */
/** North America only, which is deliberate: it states the market on the form. */
const DIAL_COUNTRIES = new Set(["US", "CA"]);

function validate(name: string, email: string, company: string, phone: string) {
  const fieldErrors: FormState["fieldErrors"] = {};

  if (name.length < 2) fieldErrors.name = "Please enter your full name.";
  else if (name.length > 120) fieldErrors.name = "That name is too long.";

  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  } else if (FREE_DOMAINS.has(email.split("@")[1]?.toLowerCase() ?? "")) {
    fieldErrors.email = "Please use your work email address.";
  }

  if (company.length < 2) fieldErrors.company = "Please enter your company name.";
  else if (company.length > 160) fieldErrors.company = "That company name is too long.";

  // US and Canada are 10 digits nationally. A leading 1 is tolerated because
  // people paste it, and stripped before the number is stored.
  const digits = phone.replace(/[^\d]/g, "").replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10) {
    fieldErrors.phone = "Please enter a 10 digit US or Canadian number.";
  }

  return fieldErrors;
}

async function deliver(payload: {
  name: string;
  email: string;
  company: string;
  phone: string;
  phoneCountry: string;
  notes: string;
}) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  const from = process.env.CONTACT_FROM;

  // Every field the WordPress Leads list shows, so the email is a complete
  // record rather than a prompt to go and look one up. Kept in step with
  // inc/contact-handler.php in the theme, which is what actually runs in
  // production; this path exists for local and any future Next deployment.
  const text = [
    "New discovery call request",
    `${site.url}/contact`,
    "",
    `Name:     ${payload.name}`,
    `Company:  ${payload.company}`,
    `Email:    ${payload.email}`,
    `Phone:    +1 ${payload.phone} (${payload.phoneCountry})`,
    "Status:   New",
    `Received: ${new Date().toISOString()}`,
    "",
    "Notes:",
    payload.notes || "(none given)",
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
  subject: `Discovery call request, ${payload.name}, ${payload.company}`,
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
  console.warn(`[contact] RESEND_API_KEY unset, submission written to ${file}`);
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
  const company = ((formData.get("company") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const rawCountry = ((formData.get("phone_country") as string) ?? "US").trim().toUpperCase();
  const phoneCountry = DIAL_COUNTRIES.has(rawCountry) ? rawCountry : "US";
  const notes = ((formData.get("notes") as string) ?? "").trim().slice(0, 4000);
  const values = { name, email, company, phone, phoneCountry, notes };

  const fieldErrors = validate(name, email, company, phone);
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
