// Configure your email service here
// For now, we'll use a placeholder that logs to console
// In production, configure with SendGrid, AWS SES, or similar

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  try {
    // Placeholder: In production, configure with your email service
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({ ...payload, from: 'noreply@transitionmusic.com' });

    console.log("[Email] Would send to:", payload.to);
    console.log("[Email] Subject:", payload.subject);
    console.log("[Email] Body:", payload.html);

    // For development, just log it
    return true;
  } catch (error) {
    console.error("[Email] Failed to send:", error);
    return false;
  }
}

export function formatContactFormEmail(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): EmailPayload {
  return {
    to: "contact@transitionmusic.com",
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
    `,
  };
}

export function formatSubmissionFormEmail(data: {
  artistName: string;
  email: string;
  phone: string;
  genre: string;
  spotifyUrl: string;
  message: string;
}): EmailPayload {
  return {
    to: "submissions@transitionmusic.com",
    subject: `New Artist Submission: ${data.artistName}`,
    html: `
      <h2>New Artist Submission</h2>
      <p><strong>Artist Name:</strong> ${escapeHtml(data.artistName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Genre:</strong> ${escapeHtml(data.genre)}</p>
      <p><strong>Spotify URL:</strong> <a href="${escapeHtml(data.spotifyUrl)}">${escapeHtml(data.spotifyUrl)}</a></p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
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
