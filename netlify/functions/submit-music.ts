import type { Handler } from "@netlify/functions";
import { z } from "zod";
import { formatSubmissionFormEmail, sendEmail } from "../../server/email";

const submissionSchema = z.object({
  artistName: z.string().trim().min(1, "Artist name is required"),
  contactName: z.string().trim().optional(),
  email: z.string().email("Invalid email"),
  phone: z.string().trim().optional(),
  genre: z.string().trim().min(1, "Genre is required"),
  spotifyUrl: z.string().url("Invalid music URL"),
  message: z.string().trim().optional(),
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { Allow: "POST" }, body: "Method Not Allowed" };
  }

  try {
    const input = submissionSchema.parse(JSON.parse(event.body || "{}"));
    const success = await sendEmail(formatSubmissionFormEmail(input));

    if (!success) {
      return response(500, { success: false, error: "Unable to deliver your submission right now." });
    }

    return response(200, { success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return response(400, { success: false, error: error.issues[0]?.message || "Invalid form data." });
    }
    console.error("[Netlify submit-music] Unexpected error:", error);
    return response(500, { success: false, error: "Unable to process your submission right now." });
  }
};

function response(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}
