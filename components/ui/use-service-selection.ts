"use client";
import { useSyncExternalStore } from "react";
import { changeServiceSearch, serviceFromSearch, type SelectedService } from "@/data/service-filter";
const changedEvent = "orvyn:service-change";
function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("pageshow", onChange);
  window.addEventListener(changedEvent, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("pageshow", onChange);
    window.removeEventListener(changedEvent, onChange);
  };
}
const getSearch = () => window.location.search;
const getServerSearch = () => "";
export function useServiceSelection() {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  return {
    service: serviceFromSearch(search),
    selectService(service?: SelectedService) {
      const nextSearch = changeServiceSearch(window.location.search, service);
      if (nextSearch === window.location.search) return;
      window.history.pushState(null, "", window.location.pathname + nextSearch + window.location.hash);
      window.dispatchEvent(new Event(changedEvent));
    }
  };
}
