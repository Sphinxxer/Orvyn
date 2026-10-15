import type { ComponentPropsWithoutRef, ChangeEventHandler } from "react";

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

