// app/api/contact/route.js
import { Resend } from "resend";

export const runtime = "nodejs";
const resend = new Resend(process.env.RESEND_API_KEY);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export async function POST(req) {
  try {
    const { name, email, message, hp } = await req.json();

    // Honeypot: if filled, silently succeed (bot)
    if (hp) return json({ ok: true }, 200);

    // Basic validation
    if (!name || !email || !message) {
      return json({ ok: false, error: "Missing fields" }, 400);
    }

    const subject = `New portfolio message from ${name}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5;">
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(
          message
        )}</pre>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM, // e.g. "Yash Portfolio <onboarding@resend.dev>"
      to: [process.env.CONTACT_TO],
      subject,
      html,
      // You can re-enable one of these if deliverability looks good:
      // reply_to: email,
      // replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      const msg =
        process.env.NODE_ENV === "production"
          ? "Resend error"
          : error?.message || JSON.stringify(error);
      return json({ ok: false, error: msg }, 500);
    }

    return json({ ok: true, id: data?.id }, 200);
  } catch (err) {
    console.error("Handler error:", err);
    const msg =
      process.env.NODE_ENV === "production"
        ? "Invalid request"
        : err?.message || JSON.stringify(err);
    return json({ ok: false, error: msg }, 400);
  }
}

// tiny helper to avoid HTML injection in the email body
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
