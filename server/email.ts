import nodemailer from "nodemailer";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

const gmailUser = process.env.TMC_GMAIL_USER ?? "";
const gmailAppPassword = process.env.TMC_GMAIL_APP_PASSWORD ?? "";
const mailFrom = process.env.TMC_MAIL_FROM ?? gmailUser;

const transporter =
  gmailUser && gmailAppPassword
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      })
    : null;

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!transporter || !mailFrom) {
    console.error(
      "[Email] Gmail is not configured. Set TMC_GMAIL_USER, TMC_GMAIL_APP_PASSWORD, and optionally TMC_MAIL_FROM."
    );
    return false;
  }

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: payload.to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    });
    return true;
  } catch (error) {
    console.error("[Email] Gmail delivery failed:", error);
    return false;
  }
}

export function formatContactFormEmail(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): EmailPayload {
  return {
    to: "contact@transitionmusic.com",
    replyTo: data.email,
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company || "Not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
    `,
  };
}

export function formatSubmissionFormEmail(data: {
  artistName: string;
  contactName?: string;
  email: string;
  phone?: string;
  genre: string;
  spotifyUrl: string;
  message?: string;
}): EmailPayload {
  return {
    to: "submissions@transitionmusic.com",
    replyTo: data.email,
    subject: `New Artist Submission: ${data.artistName}`,
    html: `
      <h2>New Artist Submission</h2>
      <p><strong>Artist / Band Name:</strong> ${escapeHtml(data.artistName)}</p>
      <p><strong>Contact Name:</strong> ${escapeHtml(data.contactName || "Not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not provided")}</p>
      <p><strong>Genre:</strong> ${escapeHtml(data.genre)}</p>
      <p><strong>Music Link:</strong> <a href="${escapeHtml(data.spotifyUrl)}">${escapeHtml(data.spotifyUrl)}</a></p>
      <p><strong>Additional Notes:</strong></p>
      <p>${escapeHtml(data.message || "Not provided").replace(/\n/g, "<br />")}</p>
    `,
  };
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
