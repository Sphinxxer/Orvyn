# Connect the Orvyn Contact Form to Google Sheets

This guide connects the Orvyn website contact form to a Google Sheet using Google Apps Script.

Flow:

```txt
Orvyn website contact form -> Google Apps Script Web App endpoint -> Google Sheet
```

## 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com).
2. Create a new spreadsheet.
3. Rename it to:

```txt
Orvyn Website Contact Form
```

4. Rename the first sheet tab to:

```txt
Forms
```

## 2. Add the column headers

In row 1 of the `Forms` sheet, add these headers in this exact order:

```txt
Submitted At
Name
Email
Phone / WhatsApp
Business / Brand Name
Website or Instagram link
What do you need help with?
Budget range
Message
```

## 3. Create the Google Apps Script

1. In the Google Sheet, click **Extensions**.
2. Click **Apps Script**.
3. Delete any default code in the editor.
4. Paste the code below.

## 4. Apps Script code to paste

```js
const SHEET_NAME = "Forms";

const HEADERS = [
  "Submitted At",
  "Name",
  "Email",
  "Phone / WhatsApp",
  "Business / Brand Name",
  "Website or Instagram link",
  "What do you need help with?",
  "Budget range",
  "Message"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getOrCreateSheet();
    ensureHeaders(sheet);

    const data = e.parameter;

    if (data.company_website) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: "blocked" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.brand || "",
      data.link || "",
      data.need || "",
      data.budget || "",
      data.message || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Orvyn contact form endpoint is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders(sheet) {
  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = currentHeaders.some(Boolean);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}
```

## 5. Deploy it as a Web App

1. In Apps Script, click **Deploy**.
2. Click **New deployment**.
3. Click the gear icon near **Select type**.
4. Choose **Web app**.
5. Set **Description** to:

```txt
Orvyn contact form endpoint
```

6. Set **Execute as** to:

```txt
Me
```

7. Set **Who has access** to:

```txt
Anyone
```

8. Click **Deploy**.
9. Approve the permissions when Google asks.
10. Copy the **Web app URL**. It should look similar to:

```txt
https://script.google.com/macros/s/AKfycb.../exec
```

## 6. Add the endpoint to `.env.local`

In the project root, create a file called:

```txt
.env.local
```

Add this line:

```txt
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace the example URL with your real Google Apps Script Web App URL.

Do not paste the Web App URL directly into the code.

## 7. Add the endpoint to Vercel

1. Open your Vercel project.
2. Go to **Settings**.
3. Go to **Environment Variables**.
4. Add this variable:

```txt
NEXT_PUBLIC_GOOGLE_SCRIPT_URL
```

5. Paste your Google Apps Script Web App URL as the value.
6. Save it.
7. Redeploy the website.

## 8. Test the form

1. Run the website locally:

```bash
npm run dev
```

2. Open:

```txt
http://127.0.0.1:3001/contact
```

3. Fill in the required fields:

- Name
- Email
- Phone / WhatsApp
- What do you need help with?
- Message

4. Submit the form.
5. You should see:

```txt
Your inquiry has been received. Weâ€™ll get in touch soon.
```

6. Open your Google Sheet.
7. A new row should appear in the `Forms` sheet.

## Troubleshooting

- If the form says the endpoint is not connected, check `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.
- If the local `.env.local` value was added while the dev server was running, restart the dev server.
- If Vercel still does not submit, redeploy after adding the environment variable.
- If the Sheet does not update, confirm the Apps Script deployment access is set to **Anyone**.
- If you edit the Apps Script later, deploy a new version of the Web App.
