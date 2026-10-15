import assert from "node:assert/strict";
import { test } from "node:test";
import { serviceFromSearch, serviceHref, changeServiceSearch } from "../data/service-filter.ts";

test("shared filter URLs and contact preselection accept only supported services", () => {
  for (const service of ["Branding", "Websites", "Marketing"]) {
    const href = serviceHref("/contact", service, "#inquiry");
    const url = new URL(href, "https://orvyn.cc");
    assert.equal(serviceFromSearch(url.search), service);
    assert.equal(url.hash, "#inquiry");
  }
  for (const search of ["", "?service=unknown", "?service=Branding", "?service="]) assert.equal(serviceFromSearch(search), undefined);
});

test("filter history URLs remove All work and preserve unrelated attribution", () => {
  const branded = changeServiceSearch("?utm_source=portfolio", "Branding");
  assert.equal(serviceFromSearch(branded), "Branding");
  const marketed = changeServiceSearch(branded, "Marketing");
  assert.equal(serviceFromSearch(marketed), "Marketing");
  assert.equal(serviceFromSearch(branded), "Branding");
  assert.equal(changeServiceSearch(marketed), "?utm_source=portfolio");
  assert.equal(serviceHref("/case-studies"), "/case-studies");
});

test("project story URLs carry the filter back to Work without changing the project path", () => {
  for (const service of [undefined, "Branding", "Websites", "Marketing"]) {
    const story = new URL(serviceHref("/case-studies/biomode", service), "https://orvyn.cc");
    assert.equal(story.pathname, "/case-studies/biomode");
    const back = serviceHref("/case-studies", serviceFromSearch(story.search));
    assert.equal(back, serviceHref("/case-studies", service));
  }
  assert.equal(serviceHref("/case-studies", serviceFromSearch("?service=unknown")), "/case-studies");
});
