export const serviceOptions = ["Branding", "Websites", "Marketing"] as const;
export type SelectedService = (typeof serviceOptions)[number];
export function serviceFromSearch(search: string): SelectedService | undefined {
  const value = new URLSearchParams(search).get("service");
  return serviceOptions.find((service) => service.toLowerCase() === value);
}
export function serviceHref(path: string, service?: SelectedService, hash = "") {
  return path + (service ? `?service=${service.toLowerCase()}` : "") + hash;
}
export function changeServiceSearch(search: string, service?: SelectedService) {
  const params = new URLSearchParams(search);
  if (service) params.set("service", service.toLowerCase());
  else params.delete("service");
  const value = params.toString();
  return value ? `?${value}` : "";
}
