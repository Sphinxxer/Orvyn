export type CapabilityIconName =
  | "performance"
  | "content"
  | "brand"
  | "website"
  | "social"
  | "system";

type CapabilityIconProps = {
  icon: string;
  className?: string;
};

export function CapabilityIcon({ icon, className = "" }: CapabilityIconProps) {
  const commonProps = {
    className: `size-9 transition duration-200 ${className}`,
    viewBox: "0 0 40 40",
    fill: "none",
    "aria-hidden": true
  };

  if (icon === "performance") {
    return (
      <svg {...commonProps}>
        <path d="M7 30 17 20l6 6 10-14" stroke="currentColor" strokeWidth="1.8" />
        <path d="M26 12h7v7" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "content") {
    return (
      <svg {...commonProps}>
        <rect x="8" y="9" width="24" height="22" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13 16h14M13 21h9M13 26h12" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "brand") {
    return (
      <svg {...commonProps}>
        <rect x="9" y="9" width="12" height="12" stroke="currentColor" strokeWidth="1.8" />
        <rect x="19" y="19" width="12" height="12" stroke="currentColor" strokeWidth="1.8" />
        <path d="M25 9h6v6M9 25v6h6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "website") {
    return (
      <svg {...commonProps}>
        <rect x="7" y="10" width="26" height="20" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 16h26M14 23h12" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "social") {
    return (
      <svg {...commonProps}>
        <rect x="9" y="8" width="19" height="15" stroke="currentColor" strokeWidth="1.8" />
        <rect x="13" y="17" width="18" height="14" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 13h9M18 22h8M18 26h5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M27 10c2.4 1.1 4 3 4.8 5.4" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="20" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="30" cy="25" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10" cy="25" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.2 12 12 22M21.8 12 28 22M14 25h12" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
