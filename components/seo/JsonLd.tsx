type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

function cleanJsonLd(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(cleanJsonLd).filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, cleanJsonLd(item)])
    );
  }

  return value;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanJsonLd(data)).replace(/</g, "\\u003c")
      }}
    />
  );
}
