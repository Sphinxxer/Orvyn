"use client";
import type { FormEvent } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import { budgetRanges } from "@/data/site";
import { contactNeeds } from "@/data/site";
import { trackClarityEvent } from "@/components/analytics/AnalyticsEvents";
import { useServiceSelection } from "@/components/ui/work-navigation";
import type { ComponentPropsWithoutRef } from "react";
import type { ChangeEventHandler } from "react";
import { WhatsAppLink } from "@/components/whatsapp-link";


type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;


type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "link" | "need", string>
>;


export function ContactForm({ submitLabel = "Send enquiry" }: { submitLabel?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState(COUNTRY_CODES[0]);
  const { service } = useServiceSelection();
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    setFieldErrors({});

    const form = event.currentTarget;

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
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const nextFieldErrors: FieldErrors = {
      name: String(formData.get("name") ?? "").trim()
        ? undefined
        : "Please enter your name.",
      email:
        String(formData.get("email") ?? "").trim() && emailInput?.validity.valid
          ? undefined
          : "Please enter a valid email address.",
      phone: !phoneInput.trim() ? "Please enter your phone number." : phoneValidation.isValid ? undefined : phoneValidation.message,
      link: isValidLink ? undefined : "Please enter a valid website, Instagram link, or handle.",
      need: String(formData.get("need") ?? "").trim()
        ? undefined
        : "Please select the capability you need help with."
    };

    const firstInvalidField = Object.entries(nextFieldErrors).find(([, message]) => message)?.[0];

    if (firstInvalidField) {
      trackClarityEvent("contact_form_submission_failed");
      setFieldErrors(nextFieldErrors);
      setStatus({
        type: "error",
        message: "Please review the highlighted fields before sending your inquiry."
      });
      window.requestAnimationFrame(() => {
        const field = form.querySelector<HTMLElement>(`[name="${firstInvalidField === "phone" ? "phoneRaw" : firstInvalidField}"]`);
        const optionalDetails = field?.closest("details");
        if (optionalDetails) optionalDetails.open = true;
        field?.focus();
      });
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
        payload.set(field, phoneInput.trim() ? normalizePhoneNumber(countryCode, phoneInput) : "");
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
      !payload.get("need") ||
      !payload.get("phone");

    if (hasMissingRequiredField) {
      trackClarityEvent("contact_form_submission_failed");
      setStatus({
        type: "error",
        message: "Please complete the required fields before sending your inquiry."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: payload.toString()
      });

      const confirmation = await response.json().catch(() => null);
      if (!response.ok || confirmation?.result !== "success") {
        throw new Error("The enquiry was not confirmed.");
      }

      form.reset();
      setSelectedNeed("");
      const optionalDetails = form.querySelector("details");
      if (optionalDetails) optionalDetails.open = false;
      setSelectedPhoneCountry(COUNTRY_CODES[0]);
      setStatus({
        type: "success",
        message: "Your inquiry has been received. We\u2019ll get back to you soon."
      });
      trackClarityEvent("contact_form_submitted");
    } catch {
      trackClarityEvent("contact_form_submission_failed");
      setStatus({
        type: "error",
        message: "Your enquiry couldn’t be sent. Please try again or email hello@orvyn.cc."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-analytics-form="contact"
      className="contact-form"
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
        <TextField
          label="Name"
          name="name"
          type="text"
          autoComplete="name"
          required
          error={fieldErrors.name}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={fieldErrors.email}
        />
        <PhoneField error={fieldErrors.phone} selectedCountry={selectedPhoneCountry} onCountryChange={(countryId) => setSelectedPhoneCountry(getCountryById(countryId))} />
      </FormGroup>

      <FormGroup title="Project needs" className="mt-10">
        <SelectField
          label="What do you need help with?"
          name="need"
          value={selectedNeed ?? service ?? ""}
          onChange={(event) => setSelectedNeed(event.target.value)}
          options={contactNeeds}
          placeholder="Select a service"
          required
          error={fieldErrors.need}
        />
        <TextAreaField
          label="Message (optional)"
          placeholder="What are you building, and what would you like help with?"
          name="message"
          className="md:col-span-2"
        />
      </FormGroup>

      <details className="optional-context">
        <summary>Additional project details <span>Optional</span></summary>
        <FormGroup title="Brand context">
          <TextField label="Business / Brand Name" name="brand" type="text" autoComplete="organization" />
          <SelectField label="Budget range (INR)" name="budget" options={budgetRanges} placeholder="Select a range" />
          <WebsiteField error={fieldErrors.link} />
        </FormGroup>
      </details>

      <button
        type="submit"
        disabled={isSubmitting}
          className="button button--primary form-submit"
      >
        {isSubmitting ? "Sending..." : submitLabel}
      </button>

      {status ? (
        <p
          className={`form-status form-status--${status.type}`}
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
          className="mt-2 block text-sm font-normal normal-case leading-6 tracking-normal text-red-800"
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
      <span className="inline-flex min-h-4 items-center gap-1 whitespace-nowrap max-[420px]:whitespace-normal">
        Phone / WhatsApp
        <span className="text-[#946327]" aria-hidden="true">*</span>
      </span>
      <div className="phone-controls mt-3 grid gap-3 sm:grid-cols-[minmax(12rem,0.48fr)_1fr]">
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
          aria-label="Phone / WhatsApp"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder={selectedCountry.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "phone-error" : undefined}
        />
      </div>
      {error ? (
        <p id="phone-error" className="mt-3 text-sm font-normal normal-case leading-6 tracking-normal text-red-800">
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
      <legend className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#946327]">
        {title}
      </legend>
      <div className="grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-7">{children}</div>
    </fieldset>
  );
}


export const fieldBase =
  "form-input";


export const labelBase =
  "form-label";


type TextFieldProps = {
  label: string;
  className?: string;
  error?: string;
} & ComponentPropsWithoutRef<"input">;


type SelectFieldProps = {
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  label: string;
  options: string[];
  placeholder: string;
  className?: string;
  name: string;
  required?: boolean;
  error?: string;
};


type TextAreaFieldProps = {
  label: string;
  className?: string;
  error?: string;
} & ComponentPropsWithoutRef<"textarea">;


export function TextField({ label, className = "", error, ...props }: TextFieldProps) {
  const fieldId = props.id ?? props.name;

  return (
    <label className={`${labelBase} ${className}`}>
      <span className="inline-flex min-h-4 items-center gap-1 whitespace-nowrap max-[420px]:whitespace-normal">
        {label}
        {props.required ? <span className="text-[#946327]" aria-hidden="true">*</span> : null}
      </span>
      <input
        className={fieldBase}
        aria-invalid={Boolean(error)}
        aria-describedby={error && fieldId ? `${fieldId}-error` : undefined}
        {...props}
      />
      {error && fieldId ? <FieldError id={`${fieldId}-error`}>{error}</FieldError> : null}
    </label>
  );
}


export function SelectField({
  value,
  onChange,
  label,
  options,
  placeholder,
  className = "",
  name,
  required = false,
  error
}: SelectFieldProps) {
  return (
    <label className={`${labelBase} ${className}`}>
      <span className="flex min-h-4 items-center gap-1 whitespace-nowrap text-[11px] leading-4 tracking-[0.13em]">
        <span>{label}</span>
        {required ? <span className="shrink-0 text-[#946327]" aria-hidden="true">*</span> : null}
      </span>
      <select
        className={fieldBase}
        name={name}
        defaultValue={value === undefined ? "" : undefined}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <FieldError id={`${name}-error`}>{error}</FieldError> : null}
    </label>
  );
}


export function TextAreaField({ label, className = "", error, ...props }: TextAreaFieldProps) {
  const fieldId = props.id ?? props.name;

  return (
    <label className={`${labelBase} ${className}`}>
      <span className="inline-flex min-h-4 items-center gap-1 whitespace-nowrap max-[420px]:whitespace-normal">
        {label}
        {props.required ? <span className="text-[#946327]" aria-hidden="true">*</span> : null}
      </span>
      <textarea
        className={`${fieldBase} min-h-40 resize-y`}
        aria-invalid={Boolean(error)}
        aria-describedby={error && fieldId ? `${fieldId}-error` : undefined}
        {...props}
      />
      {error && fieldId ? <FieldError id={`${fieldId}-error`}>{error}</FieldError> : null}
    </label>
  );
}


function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <span
      id={id}
      className="mt-2 block text-sm font-normal normal-case leading-6 tracking-normal text-red-800"
    >
      {children}
    </span>
  );
}
export type CountryCodeOption = {
  id: string;
  name: string;
  code: string;
  placeholder: string;
  minLength: number;
  maxLength: number;
  startsWith?: string[];
};


export const COUNTRY_CODES: CountryCodeOption[] = [
  {
    id: "india",
    name: "India",
    code: "+91",
    placeholder: "98765 43210",
    minLength: 10,
    maxLength: 10,
    startsWith: ["6", "7", "8", "9"]
  },
  {
    id: "united-states",
    name: "United States",
    code: "+1",
    placeholder: "(415) 555-1234",
    minLength: 10,
    maxLength: 10
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    code: "+44",
    placeholder: "7911 123456",
    minLength: 10,
    maxLength: 10
  },
  {
    id: "united-arab-emirates",
    name: "United Arab Emirates",
    code: "+971",
    placeholder: "50 123 4567",
    minLength: 9,
    maxLength: 9
  },
  {
    id: "singapore",
    name: "Singapore",
    code: "+65",
    placeholder: "8123 4567",
    minLength: 8,
    maxLength: 8
  },
  {
    id: "australia",
    name: "Australia",
    code: "+61",
    placeholder: "412 345 678",
    minLength: 9,
    maxLength: 9
  },
  {
    id: "canada",
    name: "Canada",
    code: "+1",
    placeholder: "(416) 555-1234",
    minLength: 10,
    maxLength: 10
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    code: "+966",
    placeholder: "50 123 4567",
    minLength: 9,
    maxLength: 9
  },
  { id: "qatar", name: "Qatar", code: "+974", placeholder: "3312 3456", minLength: 8, maxLength: 8 },
  { id: "oman", name: "Oman", code: "+968", placeholder: "9123 4567", minLength: 8, maxLength: 8 },
  { id: "kuwait", name: "Kuwait", code: "+965", placeholder: "5001 2345", minLength: 8, maxLength: 8 },
  { id: "bahrain", name: "Bahrain", code: "+973", placeholder: "3600 1234", minLength: 8, maxLength: 8 }
];


const phoneFormattingPattern = /^[\d\s()+\-.]+$/;

const instagramHandlePattern = /^@[A-Za-z0-9._]{1,30}$/;


export function getCountryByCode(countryCode: string) {
  return COUNTRY_CODES.find((country) => country.code === countryCode) ?? COUNTRY_CODES[0];
}


export function getCountryById(countryId: string) {
  return COUNTRY_CODES.find((country) => country.id === countryId) ?? COUNTRY_CODES[0];
}


export function cleanPhoneNumber(countryCode: string, phoneNumber: string) {
  const country = getCountryByCode(countryCode);
  const countryDigits = country.code.replace(/\D/g, "");
  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.startsWith(countryDigits) && digits.length > country.maxLength) {
    return digits.slice(countryDigits.length);
  }

  return digits;
}


export function validatePhoneNumber(countryCode: string, phoneNumber: string) {
  const country = getCountryByCode(countryCode);
  const trimmedPhone = phoneNumber.trim();

  if (!trimmedPhone || !phoneFormattingPattern.test(trimmedPhone)) {
    return {
      isValid: false,
      message:
        country.code === "+91"
          ? "Please enter a valid 10-digit Indian mobile number."
          : "Please enter a valid phone number."
    };
  }

  const digits = cleanPhoneNumber(country.code, trimmedPhone);
  const isAllZeroes = /^0+$/.test(digits);
  const hasValidLength = digits.length >= country.minLength && digits.length <= country.maxLength;
  const hasValidPrefix = country.startsWith ? country.startsWith.includes(digits[0]) : true;

  if (!digits || isAllZeroes || !hasValidLength || !hasValidPrefix) {
    return {
      isValid: false,
      message:
        country.code === "+91"
          ? "Please enter a valid 10-digit Indian mobile number."
          : "Please enter a valid phone number."
    };
  }

  return { isValid: true, message: "" };
}


export function normalizePhoneNumber(countryCode: string, phoneNumber: string) {
  const country = getCountryByCode(countryCode);
  const digits = cleanPhoneNumber(country.code, phoneNumber);

  return `${country.code}${digits}`;
}


export function validateWebsiteOrInstagram(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return true;
  }

  if (instagramHandlePattern.test(trimmedValue)) {
    return true;
  }

  if (/\s/.test(trimmedValue)) {
    return false;
  }

  try {
    const valueWithProtocol = /^https?:\/\//i.test(trimmedValue)
      ? trimmedValue
      : `https://${trimmedValue}`;
    const url = new URL(valueWithProtocol);

    return Boolean(url.hostname.includes(".") && url.hostname.length > 3);
  } catch {
    return false;
  }
}


export function normalizeWebsiteOrInstagram(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue || trimmedValue.startsWith("@") || /^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}


export function ContactWhatsAppLink() {
  const { service } = useServiceSelection();
  return <WhatsAppLink placement="contact" service={service} />;
}
