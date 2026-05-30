import type { ComponentPropsWithoutRef } from "react";

export const fieldBase =
  "mt-3 min-h-[3.35rem] w-full rounded-2xl border border-white/15 bg-white/[0.025] px-4 py-3.5 text-base leading-6 text-white outline-none transition duration-200 placeholder:text-muted/45 hover:border-white/25 focus:border-gold/70 focus:bg-ink focus:ring-1 focus:ring-gold/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/45";

export const labelBase =
  "block text-xs font-semibold uppercase tracking-[0.16em] text-muted";

type TextFieldProps = {
  label: string;
  className?: string;
} & ComponentPropsWithoutRef<"input">;

type SelectFieldProps = {
  label: string;
  options: string[];
  placeholder: string;
  className?: string;
  name: string;
  required?: boolean;
};

type TextAreaFieldProps = {
  label: string;
  className?: string;
} & ComponentPropsWithoutRef<"textarea">;

export function TextField({ label, className = "", ...props }: TextFieldProps) {
  return (
    <label className={`${labelBase} ${className}`}>
      <span className="inline-flex min-h-4 items-center gap-1 whitespace-nowrap max-[420px]:whitespace-normal">
        {label}
        {props.required ? <span className="text-gold-soft" aria-hidden="true">*</span> : null}
      </span>
      <input className={fieldBase} {...props} />
    </label>
  );
}

export function SelectField({
  label,
  options,
  placeholder,
  className = "",
  name,
  required = false
}: SelectFieldProps) {
  return (
    <label className={`${labelBase} ${className}`}>
      <span className="inline-flex min-h-4 items-center gap-1 whitespace-nowrap max-[420px]:whitespace-normal">
        {label}
        {required ? <span className="text-gold-soft" aria-hidden="true">*</span> : null}
      </span>
      <select className={fieldBase} name={name} defaultValue="" required={required}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextAreaField({ label, className = "", ...props }: TextAreaFieldProps) {
  return (
    <label className={`${labelBase} ${className}`}>
      <span className="inline-flex min-h-4 items-center gap-1 whitespace-nowrap max-[420px]:whitespace-normal">
        {label}
        {props.required ? <span className="text-gold-soft" aria-hidden="true">*</span> : null}
      </span>
      <textarea className={`${fieldBase} min-h-40 resize-y`} {...props} />
    </label>
  );
}
