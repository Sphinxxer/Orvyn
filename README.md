# Orvyn — compact GitHub package

Prepared 13 November 2026. This package contains 98 files for the approved local website. Upload its contents at the existing repository root, preserving the repository’s `.git` history.

## What is included

Home, Work, project-detail pages, Contact, the enquiry API, SEO metadata, the Open Graph image generator, required fonts and licences, client imagery and identity PDFs. The warm single-font Home hero, mascot, GSAP motion, continuous client strip, service cards, factual trust section and refined header/footer are included. Testimonial image mockups remain proposals.

## Compact packaging

Unused components and redirected legacy page implementations, historical previews, sample portraits, draft documentation and duplicate font assets were removed. Related source modules were consolidated; the Home stylesheet reuses the fonts already loaded by the root layout. The existing about/services redirects remain configured. `docs/revamp/source-assets/orvyn-hero-source.png` is retained because the Open Graph image generator reads it at runtime.

Development tests and original source modules remain in the separate Working Project. This upload folder is the compact release copy; do not mix future Working Project files into it without refreshing the package and revalidating imports.

## Local use

Use Node.js 24.x.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3001. To validate this release, run `npm run lint` and `npm run build`.

## GitHub and hosting

Use a clean checkout of https://github.com/Sphinxxer/Orvyn on a new branch. Copy this package’s contents into the root, retaining `.git`. Review the diff and remove obsolete files absent from this compact package. Do not force-push or replace Git history. Uploading the ZIP itself does not install a website: extract it first. Pushing a deployment-connected branch can automatically deploy.

Hosting: Next.js with Node.js 24.x, `npm ci`, `npm run build`, standard Next.js output. The enquiry API needs server hosting and does not work on GitHub Pages.

Only blank `.env.example` is included. Configure the existing private `GOOGLE_SCRIPT_URL` in the hosting environment for form delivery. Never commit its value. `NEXT_PUBLIC_CLARITY_PROJECT_ID` and `NEXT_PUBLIC_BOOKING_URL` are optional. Keep existing hosting environment settings.

## Release limitations

The dependency install reports security issues, including high and critical findings, and Next.js reports a known vulnerability. Resolve those before public deployment. Production enquiry delivery remains unverified; no real enquiry or WhatsApp message was sent during packaging. This package preserves the reviewed functionality and does not change dependency versions.

## Compact package validation

Fresh dependency install, lint and production build passed in an isolated copy. Lint retains the existing unused-disable warning; the build succeeded on retry after the existing Next.js security advisory. Browser checks confirmed Home rendering, service filtering, a rendered BIOMODE PDF with 21 pages, and Contact validation of empty fields. Open Graph image, robots, sitemap and representative project-detail routes returned HTTP 200. An empty API payload was rejected with HTTP 400; no real enquiry was sent. Home markup matches Working Project exactly; font loading reuses the root layout’s existing fonts. No claim of security clearance is made.
