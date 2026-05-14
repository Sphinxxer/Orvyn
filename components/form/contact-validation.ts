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

  return `${country.code} ${digits}`;
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
