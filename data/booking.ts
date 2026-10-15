// Configure the owner's hosted Cal.com event URL before enabling direct booking.
const candidate = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
function validBookingUrl(value: string | undefined) {
  if (!value) return undefined;
  try { const url = new URL(value); return url.protocol === "https:" ? url.toString() : undefined; }
  catch { return undefined; }
}
export const bookingUrl = validBookingUrl(candidate);
export const bookingLabel = bookingUrl ? "Book an intro call" : "Request an intro call";

