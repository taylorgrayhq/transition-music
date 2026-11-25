interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
}

type FormData = Record<string, unknown>;

const RESEND_FROM = "Transition Music website <forms@transitionmusic.com>";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/submit-music") {
      return handleSubmission(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request: Request, env: Env): Promise<Response> {
  const data = await readJson(request);
  const name = text(data.name);
  const company = text(data.company);
  const email = text(data.email);
  const phone = text(data.phone);
  const subject = text(data.subject);
  const message = text(data.message);

  if (!name) return json({ success: false, error: "Name is required" }, 400);
  if (!isEmail(email)) return json({ success: false, error: "Invalid email" }, 400);
  if (!subject) return json({ success: false, error: "Subject is required" }, 400);
  if (!message) return json({ success: false, error: "Message is required" }, 400);

  const delivered = await sendWithResend(env, {
    to: "info@transitionmusic.com",
    replyTo: email,
    subject: `New Contact Form Submission: ${subject}`,
    html: `<h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
  });

  return delivered
    ? json({ success: true })
    : json({ success: false, error: "Unable to deliver your message right now." }, 500);
}

async function handleSubmission(request: Request, env: Env): Promise<Response> {
  const data = await readJson(request);
  const artistName = text(data.artistName);
  const contactName = text(data.contactName);
  const email = text(data.email);
  const phone = text(data.phone);
  const genre = text(data.genre);
  const spotifyUrl = text(data.spotifyUrl);
  const message = text(data.message);

  if (!artistName) return json({ success: false, error: "Artist name is required" }, 400);
  if (!isEmail(email)) return json({ success: false, error: "Invalid email" }, 400);
  if (!genre) return json({ success: false, error: "Genre is required" }, 400);
  if (!isUrl(spotifyUrl)) return json({ success: false, error: "Invalid music URL" }, 400);

  const delivered = await sendWithResend(env, {
    to: "submissions@transitionmusic.com",
    replyTo: email,
    subject: `New Artist Submission: ${artistName}`,
    html: `<h2>New Artist Submission</h2>
      <p><strong>Artist / Band Name:</strong> ${escapeHtml(artistName)}</p>
      <p><strong>Contact Name:</strong> ${escapeHtml(contactName || "Not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
      <p><strong>Genre:</strong> ${escapeHtml(genre)}</p>
      <p><strong>Music Link:</strong> <a href="${escapeHtml(spotifyUrl)}">${escapeHtml(spotifyUrl)}</a></p>
      <p><strong>Additional Notes:</strong></p>
      <p>${escapeHtml(message || "Not provided").replace(/\n/g, "<br />")}</p>`,
  });

  return delivered
    ? json({ success: true })
    : json({ success: false, error: "Unable to deliver your submission right now." }, 500);
}

async function sendWithResend(
  env: Env,
  payload: { to: string; replyTo: string; subject: string; html: string }
): Promise<boolean> {
  if (!env.RESEND_API_KEY) {
    console.error("[Resend] RESEND_API_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: RESEND_FROM, ...payload }),
    });
    return response.ok;
  } catch (error) {
    console.error("[Resend] Delivery failed", error);
    return false;
  }
}

async function readJson(request: Request): Promise<FormData> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? (body as FormData) : {};
  } catch {
    return {};
  }
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
