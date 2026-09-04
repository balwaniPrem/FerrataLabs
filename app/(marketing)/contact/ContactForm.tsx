"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "./actions";
import { site } from "@/content/site";

const initial: FormState = { ok: false };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="card">
        <div className="form-ok">
          <h4>Got it, thank you.</h4>
          <p>
            We&rsquo;ll come back to you within one business day to find a time. If
            it&rsquo;s urgent, email <a href={`mailto:${site.email}`}>{site.email}</a> and
            it&rsquo;ll reach the same place.
          </p>
        </div>
      </div>
    );
  }

  const v = state.values;
  const fe = state.fieldErrors;

  return (
    <div className="card">
      <h3>Request a call</h3>
      <p className="sub">
        Four fields. We&rsquo;ll come back within one business day with times.
      </p>

      {state.error && <p className="form-err">{state.error}</p>}

      <form action={action} noValidate>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={v?.name}
            aria-invalid={fe?.name ? true : undefined}
            aria-describedby={fe?.name ? "err-name" : undefined}
          />
          {fe?.name && (
            <p className="err" id="err-name">
              {fe.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Business email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v?.email}
            aria-invalid={fe?.email ? true : undefined}
            aria-describedby={fe?.email ? "err-email" : undefined}
          />
          {fe?.email && (
            <p className="err" id="err-email">
              {fe.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="company">Company name</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            defaultValue={v?.company}
            aria-invalid={fe?.company ? true : undefined}
            aria-describedby={fe?.company ? "err-company" : undefined}
          />
          {fe?.company && (
            <p className="err" id="err-company">
              {fe.company}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number</label>
          {/* Only US and Canada are offered, which is the point: it says who we
              work with before anyone has to ask. Both share +1, so the code is
              static text and the select carries the country. */}
          <div className="phone-group" data-invalid={fe?.phone ? "true" : undefined}>
            <span className="phone-sel">
              <select
                name="phone_country"
                aria-label="Country"
                defaultValue={v?.phoneCountry ?? "US"}
              >
                <option value="US">&#127482;&#127480; US</option>
                <option value="CA">&#127464;&#127462; CA</option>
              </select>
            </span>
            <span className="phone-code" aria-hidden="true">
              +1
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="555 000 1234"
              required
              defaultValue={v?.phone}
              aria-invalid={fe?.phone ? true : undefined}
              aria-describedby={fe?.phone ? "err-phone" : undefined}
            />
          </div>
          {fe?.phone && (
            <p className="err" id="err-phone">
              {fe.phone}
            </p>
          )}
        </div>

        {/* Optional, and last on purpose: an open box above the required fields
            invites people to write instead of finishing the form. */}
        <div className="field">
          <label htmlFor="notes">Anything to add</label>
          <p className="hint" id="hint-notes">
            Optional. The workflow you&rsquo;d bring to the call, or anything we should
            know first.
          </p>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            maxLength={4000}
            defaultValue={v?.notes}
            aria-describedby="hint-notes"
          />
        </div>

        {/* honeypot, hidden from people, irresistible to bots */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn btn-lg" style={{ width: "100%" }} disabled={pending}>
          {pending ? "Sending…" : "Request a call"}
        </button>

        <p className="form-note">
          We use these details to contact you about your enquiry and nothing else. No list,
          no sequence, no reselling.
        </p>
      </form>

      <ul style={{ marginTop: 22 }}>
        <li>No deck, no discovery questionnaire</li>
        <li>Straight to the workflow</li>
        <li>Range on cost before you leave the call</li>
      </ul>
      <p className="meta">
        Or email{" "}
        <a href={`mailto:${site.email}`} style={{ color: "var(--accent)" }}>
          {site.email}
        </a>
      </p>
    </div>
  );
}
