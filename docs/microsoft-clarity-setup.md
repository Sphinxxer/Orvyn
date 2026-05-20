# Microsoft Clarity Setup

Orvyn uses Microsoft Clarity through a Next.js environment variable.

## Environment Variable

Add this in Vercel and in `.env.local` when testing locally:

```bash
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
```

Only use the project ID, not the full tracking script.

## Where To Find The Project ID

1. Open Microsoft Clarity.
2. Select the Orvyn project.
3. Go to **Settings** -> **Setup**.
4. Choose manual installation.
5. Copy the project ID from the tracking code.

In the script, it is the final value passed into the install snippet.

## Vercel Setup

1. Open the Orvyn project in Vercel.
2. Go to **Settings** -> **Environment Variables**.
3. Add:
   - Key: `NEXT_PUBLIC_CLARITY_PROJECT_ID`
   - Value: your Clarity project ID
4. Enable it for **Production**.
5. Redeploy the site.

## Verification

After deployment:

1. Open `https://orvyn.cc`.
2. Open browser DevTools -> Network.
3. Search for `clarity.ms`.
4. You should see a request similar to:
   `https://www.clarity.ms/tag/YOUR_PROJECT_ID`
5. In Microsoft Clarity, use the project setup verification or wait for dashboard data to appear.

## Notes

- The script does not load if `NEXT_PUBLIC_CLARITY_PROJECT_ID` is missing.
- The contact form and Google Sheets submission flow are unchanged.
- Clarity is loaded after the page becomes interactive so it does not block the initial render.
