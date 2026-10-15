# Orvyn v3

Current Orvyn website source, prepared for GitHub and Vercel on 15 October 2026. This compact package has 98 files, including the latest mobile mascot framing, service-filter return links, Contact field contrast and metadata updates.

## Upload to GitHub

Upload the contents of this folder to the repository root. `package.json`, `app/`, `components/`, `data/`, `public/` and `docs/` must sit at the root, without another enclosing folder.

Include `.gitignore` and the blank `.env.example`. Real environment files, installed dependencies, build output and local review material are deliberately excluded. The existing website and older upload folder remain separate.

## Deploy on Vercel

1. Import the GitHub repository into Vercel, or use it as the connected repository for your existing Orvyn project.
2. Framework preset: **Next.js**. Root directory: **./**. Node.js version: **24.x**, matching the local verification environment.
3. Keep the framework output-directory default. Build command: `npm run build`. Install command: `npm ci`.
4. Configure the environment variables below before deployment. Keep any existing domain configuration; connect `orvyn.cc` to the intended project when ready.
5. Deploy, then complete the checks below on the actual Vercel URL and production domain.

No `vercel.json` or static export is needed. The Next.js server handles `/api/inquiry`; GitHub Pages/static-only hosting cannot provide that endpoint.

## Environment variables

| Name | Purpose | Required? |
| --- | --- | --- |
| `GOOGLE_SCRIPT_URL` | Your existing deployed Google Apps Script Web App URL, ending in `/exec`. Copy its value from the private local configuration into Vercel, never into GitHub. | Required for enquiry delivery. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity project ID only. | Optional; omit when unused. |
| `NEXT_PUBLIC_BOOKING_URL` | Configured HTTPS Cal.com event URL. | Optional; omit until ready. The site keeps the request-an-intro-call form flow. |

Set `GOOGLE_SCRIPT_URL` for Production. Configure Preview separately if preview enquiries should use the same endpoint or a dedicated test destination. `NEXT_PUBLIC_` values are public and are included at build time; redeploy after changing them. The older `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` fallback remains supported in code, but use the server-only `GOOGLE_SCRIPT_URL` for this deployment.

The existing Apps Script integration is retained. Use the deployed endpoint already configured in the private working website; its response must confirm `{"result":"success"}`. For Clarity, use the project ID from the project's setup screen, rather than the full script. A successful build does not prove enquiry delivery. Full integration guides remain in the original working folder and the backup.

## Local development

Use Node.js 24.x. Run:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3001`. For local enquiry integration, copy `.env.example` to `.env.local` and configure the private endpoint there. Next.js generates `next-env.d.ts` automatically.

```sh
npm run lint
npm test
npm run build
```

## Assets to retain

Keep all assets in `public/` and fonts in `app/fonts/`. Also retain `docs/revamp/source-assets/orvyn-hero-source.png`: the Open Graph image generator reads it during the build. PDFs and the PDF worker are included in the public assets.

## After deployment

- Check Home, Work, Contact, project stories, PDF controls, filters, return links and mobile navigation.
- Check `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, canonicals and permanent redirects from `/about` and `/services`.
- Verify configured analytics and any booking URL. Keep booking-link clicks separate from confirmed bookings.
- Run the actual enquiry-delivery test once explicitly authorised, and confirm the provider received it. Automated enquiry tests mock the provider.
- Review mobile performance on the deployed site. Submit `https://orvyn.cc/sitemap.xml` to Google Search Console and Bing Webmaster Tools after verifying domain ownership, and check crawl access on the production host. Metadata cannot guarantee rankings or AI recommendations.

## Verification for this package

The compact package retains the active application code, current images, PDFs, fonts and font licences. The obsolete `/about` and `/services` page implementations and their exclusive components and imagery are omitted; the same permanent redirects remain in `next.config.ts`. Unused preview variants, unused icon variants and separate setup guides are also omitted. The full pre-compaction package is recoverable in the separate Orvyn v3 Backup folder.

Every retained application, configuration, lockfile, test and asset file matches the verified working source by SHA-256; packaging documentation and ignore rules are the only modified files. The package contains no real environment files, build caches or dependencies. No GitHub upload, Vercel deployment or live enquiry submission has been performed.

Compact-package verification passed: a fresh `npm ci`, lint, all 9 tests and a production build. Generated main-page markup for Home, Work, Contact, FLYIR and BIOMODE is identical to the original build. Both `/about` and `/services` still produce their existing permanent redirects.

Official references: [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs), [supported Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [environment variables](https://vercel.com/docs/environment-variables).
