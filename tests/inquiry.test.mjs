import assert from "node:assert/strict";
import { after, beforeEach, test, mock } from "node:test";
import { POST } from "../app/api/inquiry/route.ts";
import { normalizePhoneNumber } from "../components/form/contact-validation.ts";
const previousPrivate = process.env.GOOGLE_SCRIPT_URL;
const previousPublic = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
const valid = { name:"Example Founder", email:"founder@example.com", phone:"+919876543210", need:"Branding", message:"We would like to discuss our brand.", brand:"Example Brand", link:"https://example.com", budget:"Not sure yet" };
const request = (values = valid) => new Request("http://localhost/api/inquiry", { method:"POST", body:new URLSearchParams(values) });
beforeEach(() => { mock.restoreAll(); process.env.GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/test/exec"; delete process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL; });
after(() => {
  mock.restoreAll();
  if (previousPrivate === undefined) delete process.env.GOOGLE_SCRIPT_URL; else process.env.GOOGLE_SCRIPT_URL = previousPrivate;
  if (previousPublic === undefined) delete process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL; else process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL = previousPublic;
});
test("invalid enquiry never reaches the external endpoint", async () => {
  const fetchStub = mock.method(globalThis, "fetch", async () => { throw Error("must not send"); });
  assert.equal((await POST(request({ ...valid, email:"invalid" }))).status, 400);
  assert.equal((await POST(request({ ...valid, phone:"123" }))).status, 400);
  assert.equal((await POST(request({ ...valid, phone:"" }))).status, 400);
  assert.equal((await POST(request({ ...valid, phone:"+91 abc9876543210" }))).status, 400);
  assert.equal(fetchStub.mock.callCount(), 0);
});
test("honeypot rejects a bot without transmitting fields", async () => {
  const fetchStub = mock.method(globalThis, "fetch", async () => { throw Error("must not send"); });
  assert.equal((await POST(request({ ...valid, company_website:"spam" }))).status, 400);
  assert.equal(fetchStub.mock.callCount(), 0);
});
test("missing deployment configuration is a clear failure", async () => {
  delete process.env.GOOGLE_SCRIPT_URL;
  const fetchStub = mock.method(globalThis, "fetch", async () => { throw Error("must not send"); });
  assert.equal((await POST(request())).status, 503);
  assert.equal(fetchStub.mock.callCount(), 0);
});
test("success requires Apps Script confirmation and preserves the sheet fields", async () => {
  let sent;
  mock.method(globalThis, "fetch", async (_url, options) => { sent = new URLSearchParams(options.body); return Response.json({ result:"success" }); });
  const response = await POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).result, "success");
  for (const [key,value] of Object.entries(valid)) assert.equal(sent.get(key), value);
  assert.ok(sent.get("submittedAt"));
});
test("an enquiry without an optional message forwards an empty sheet field", async () => {
  let sent;
  mock.method(globalThis, "fetch", async (_url, options) => { sent = new URLSearchParams(options.body); return Response.json({ result:"success" }); });
  const { message, ...withoutMessage } = valid;
  assert.ok(message);
  assert.equal((await POST(request(withoutMessage))).status, 200);
  assert.equal(sent.get("message"), "");
  assert.equal(sent.get("phone"), valid.phone);
  assert.equal(sent.get("email"), valid.email);
});
test("the form phone normalizer produces a number accepted by the API", async () => {
  let sent;
  mock.method(globalThis, "fetch", async (_url, options) => { sent = new URLSearchParams(options.body); return Response.json({ result:"success" }); });
  const phone = normalizePhoneNumber("+91", "98765 43210");
  assert.equal(phone, "+919876543210");
  assert.equal((await POST(request({ ...valid, phone, message:"" }))).status, 200);
  assert.equal(sent.get("phone"), phone);
});
test("formatted phone numbers are accepted and sent in canonical form", async () => {
  let sent;
  mock.method(globalThis, "fetch", async (_url, options) => { sent = new URLSearchParams(options.body); return Response.json({ result:"success" }); });
  assert.equal((await POST(request({ ...valid, phone:"+91 98765 43210" }))).status, 200);
  assert.equal(sent.get("phone"), valid.phone);
});
test("a blank server-only setting can use the existing legacy endpoint setting", async () => {
  process.env.GOOGLE_SCRIPT_URL = "  ";
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/legacy/exec";
  mock.method(globalThis, "fetch", async (url) => {
    assert.equal(url, process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL);
    return Response.json({ result:"success" });
  });
  assert.equal((await POST(request())).status, 200);
});
test("provider rejection, unexpected body, HTTP failure and timeout never report success", async () => {
  for (const result of [
    () => Response.json({ result:"error" }),
    () => new Response("Not JSON"),
    () => Response.json({ result:"success" }, { status:500 }),
    () => { throw Error("network timeout"); }
  ]) {
    mock.restoreAll();
    mock.method(globalThis, "fetch", async () => result());
    assert.equal((await POST(request())).status, 502);
  }
});

