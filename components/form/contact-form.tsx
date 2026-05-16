"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { budgetRanges, contactNeeds } from "@/data/home";
import { fieldBase, labelBase, SelectField, TextAreaField, TextField } from "./contact-field";
import {
  COUNTRY_CODES,
  getCountryById,
  normalizePhoneNumber,
  normalizeWebsiteOrInstagram,
  validatePhoneNumber,
  validateWebsiteOrInstagram
} from "./contact-validation";

type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; link?: string }>({});
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState(COUNTRY_CODES[0]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setFieldErrors({});

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      setStatus({
        type: "error",
        message: "Please complete the required fields before sending your inquiry."
      });
      return;
    }

    const formData = new FormData(form);

    if (String(formData.get("company_website") ?? "").trim()) {
      return;
    }

    const selectedCountry = getCountryById(String(formData.get("phoneCountry") ?? COUNTRY_CODES[0].id));
    const countryCode = selectedCountry.code;
    const phoneInput = String(formData.get("phoneRaw") ?? "");
    const linkInput = String(formData.get("link") ?? "");
    const phoneValidation = validatePhoneNumber(countryCode, phoneInput);
    const isValidLink = validateWebsiteOrInstagram(linkInput);
    const nextFieldErrors = {
      phone: phoneValidation.isValid ? undefined : phoneValidation.message,
      link: isValidLink ? undefined : "Please enter a valid website, Instagram link, or handle."
    };

    if (nextFieldErrors.phone || nextFieldErrors.link) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    const payload = new URLSearchParams();

    [
      "submittedAt",
      "name",
      "email",
      "phone",
      "brand",
      "link",
      "need",
      "budget",
      "message"
    ].forEach((field) => {
      if (field === "submittedAt") {
        payload.set(field, new Date().toISOString());
        return;
      }

      if (field === "phone") {
        payload.set(field, normalizePhoneNumber(countryCode, phoneInput));
        return;
      }

      if (field === "link") {
        payload.set(field, normalizeWebsiteOrInstagram(linkInput));
        return;
      }

      payload.set(field, String(formData.get(field) ?? "").trim());
    });

    const hasMissingRequiredField =
      !payload.get("name") ||
      !payload.get("email") ||
      !payload.get("phone") ||
      !payload.get("need") ||
      !payload.get("message");

    if (hasMissingRequiredField) {
      setStatus({
        type: "error",
        message: "Please complete the required fields before sending your inquiry."
      });
      return;
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      setStatus({
        type: "error",
        message: "The form is not connected yet. Add NEXT_PUBLIC_GOOGLE_SCRIPT_URL and redeploy."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: payload.toString()
      });

      form.reset();
      setSelectedPhoneCountry(COUNTRY_CODES[0]);
      setStatus({
        type: "success",
        message: "Your inquiry has been received. We\u2019ll get back to you soon."
      });
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] bg-coal/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-7 lg:p-9"
      aria-label="Project inquiry form"
    >
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <FormGroup title="Your details">
        <TextField label="Name" name="name" type="text" autoComplete="name" required />
        <TextField label="Email" name="email" type="email" autoComplete="email" required />
        <PhoneField
          error={fieldErrors.phone}
          selectedCountry={selectedPhoneCountry}
          onCountryChange={(countryId) => {
            setSelectedPhoneCountry(getCountryById(countryId));
          }}
        />
      </FormGroup>

      <FormGroup title="Brand context" className="mt-10">
        <TextField
          label="Business / Brand Name"
          name="brand"
          type="text"
          autoComplete="organization"
        />
        <WebsiteField
          error={fieldErrors.link}
        />
      </FormGroup>

      <FormGroup title="Project needs" className="mt-10">
        <SelectField
          label="What do you need help with?"
          name="need"
          options={contactNeeds}
          placeholder="Select a service"
          required
        />
        <SelectField
          label="Budget range"
          name="budget"
          options={budgetRanges}
          placeholder="Select a range"
        />
        <TextAreaField label="Message" name="message" className="md:col-span-2" required />
      </FormGroup>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-gold bg-gold px-6 py-3 text-sm font-semibold text-ink shadow-[0_18px_48px_rgba(200,169,90,0.13)] transition duration-200 hover:-translate-y-0.5 hover:border-gold-soft hover:bg-gold-soft hover:shadow-[0_22px_56px_rgba(200,169,90,0.16)] focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ink active:translate-y-0 disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-white/12 disabled:text-muted disabled:shadow-none disabled:hover:translate-y-0 sm:w-fit"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>

      {status ? (
        <p
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status.type === "success"
              ? "border-gold/35 bg-gold/10 text-gold-soft"
              : "border-red-400/30 bg-red-500/10 text-red-200"
          }`}
          role={status.type === "error" ? "alert" : "status"}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

function WebsiteField({ error }: { error?: string }) {
  return (
    <label className={`${labelBase} md:col-span-2`}>
      <span>Website or Instagram link</span>
      <input
        className={fieldBase}
        name="link"
        type="text"
        inputMode="url"
        placeholder="Website or Instagram"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "link-helper link-error" : "link-helper"}
      />
      <span
        id="link-helper"
        className="mt-2 block text-sm font-normal normal-case leading-6 tracking-normal text-muted/78"
      >
        Example: yourwebsite.com or @instagramhandle
      </span>
      {error ? (
        <span
          id="link-error"
          className="mt-2 block text-sm font-normal normal-case leading-6 tracking-normal text-red-200"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}

function PhoneField({
  error,
  selectedCountry,
  onCountryChange
}: {
  error?: string;
  selectedCountry: (typeof COUNTRY_CODES)[number];
  onCountryChange: (countryId: string) => void;
}) {
  return (
    <div className={`${labelBase} md:col-span-2`}>
      <span>
        Phone / WhatsApp
        <span className="text-gold-soft" aria-hidden="true"> *</span>
      </span>
      <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(12rem,0.48fr)_1fr]">
        <select
          className={`${fieldBase} mt-0`}
          name="phoneCountry"
          value={selectedCountry.id}
          onChange={(event) => onCountryChange(event.target.value)}
          aria-label="Country code"
        >
          {COUNTRY_CODES.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name} ({country.code})
            </option>
          ))}
        </select>
        <input
          className={`${fieldBase} mt-0`}
          name="phoneRaw"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={selectedCountry.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "phone-error" : undefined}
        />
      </div>
      {error ? (
        <p id="phone-error" className="mt-3 text-sm font-normal normal-case leading-6 tracking-normal text-red-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormGroup({
  title,
  className = "",
  children
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={`border-t border-white/10 pt-7 first:border-t-0 first:pt-0 ${className}`}>
      <legend className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
        {title}
      </legend>
      <div className="grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-7">{children}</div>
    </fieldset>
  );
}
