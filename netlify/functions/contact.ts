import type { Handler } from "@netlify/functions";
import { z } from "zod";
import { formatContactFormEmail, sendEmail } from "../../server/email";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  company: z.string().trim().optional(),
  email: z.string().email("Invalid email"),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(1, "Subject is required"),
  message: z.string().trim().min(1, "Message is required"),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { Allow: "POST" }, body: "Method Not Allowed" };
  }

  try {
    const input = contactSchema.parse(JSON.parse(event.body || "{}"));
    const success = await sendEmail(formatContactFormEmail(input));

    if (!success) {
      return response(500, { success: false, error: "Unable to deliver your message right now." });
    }

    return response(200, { success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response(400, { success: false, error: error.issues[0]?.message || "Invalid form data." });
    }
    console.error("[Netlify contact] Unexpected error:", error);
    return response(500, { success: false, error: "Unable to process your message right now." });
  }
};

function response(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
