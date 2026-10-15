// Preserve the existing Apps Script field contract, but acknowledge confirmed delivery.
export async function POST(request: Request) {
  const data = await request.formData().catch(() => null);
  if (!data) return Response.json({ error: "Please check your enquiry and try again." }, { status: 400 });
  if (String(data.get("company_website") ?? "").trim()) return Response.json({ error: "Please try again." }, { status: 400 });
  const required = ["name", "email", "need", "message"];
  const fields = ["submittedAt", ...required, "phone", "brand", "link", "budget"];
  if (required.some((field) => !String(data.get(field) ?? "").trim())) {
    return Response.json({ error: "Please complete the required fields." }, { status: 400 });
  }
  const email = String(data.get("email")).trim();
  const phone = String(data.get("phone") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || (phone && !/^\+\d{8,15}$/.test(phone))) {
    return Response.json({ error: "Please check your email and any phone number provided." }, { status: 400 });
  }
  if (fields.some((field) => String(data.get(field) ?? "").length > (field === "message" ? 6000 : 2000))) {
    return Response.json({ error: "Please shorten the details and try again." }, { status: 400 });
  }
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL ?? process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return Response.json({ error: "We couldn't send your enquiry. Please try again later." }, { status: 503 });
  const payload = new URLSearchParams();
  fields.forEach((field) => payload.set(field, field === "submittedAt" ? new Date().toISOString() : String(data.get(field) ?? "").trim()));
  try {
    const result = await fetch(scriptUrl, {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: payload.toString(), signal: AbortSignal.timeout(20000), cache: "no-store"
    });
    const confirmation = await result.json().catch(() => null);
    if (!result.ok || confirmation?.result !== "success") {
      return Response.json({ error: "We couldn't confirm your enquiry was received. Please try again." }, { status: 502 });
    }
    return Response.json({ result: "success" });
  } catch {
    return Response.json({ error: "We couldn't send your enquiry. Please try again." }, { status: 502 });
  }
}

