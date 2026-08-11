import type { ComponentPropsWithoutRef } from "react";

export const fieldBase =
  "mt-3 min-h-[3.35rem] w-full rounded-2xl border border-white/15 bg-white/[0.025] px-4 py-3.5 text-base leading-6 text-white outline-none transition duration-200 placeholder:text-muted/45 hover:border-white/25 focus:border-gold/70 focus:bg-ink focus:ring-1 focus:ring-gold/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/45";

export const labelBase =
  "block text-xs font-semibold uppercase tracking-[0.16em] text-muted";

type TextFieldProps = {
  label: string;
  className?: string;
  error?: string;
} & ComponentPropsWithoutRef<"input">;

type SelectFieldProps = {
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
        {props.required ? <span className="text-gold-soft" aria-hidden="true">*</span> : null}
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
        {required ? <span className="shrink-0 text-gold-soft" aria-hidden="true">*</span> : null}
      </span>
      <select
        className={fieldBase}
        name={name}
        defaultValue=""
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
        {props.required ? <span className="text-gold-soft" aria-hidden="true">*</span> : null}
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
      className="mt-2 block text-sm font-normal normal-case leading-6 tracking-normal text-red-200"
    >
      {children}
    </span>
  );
}
