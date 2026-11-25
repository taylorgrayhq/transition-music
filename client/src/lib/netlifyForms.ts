export type ContactFormInput = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type MusicSubmissionInput = {
  artistName: string;
  contactName?: string;
  email: string;
  phone?: string;
  genre: string;
  spotifyUrl: string;
  message?: string;
};

export const usesNetlifyForms = import.meta.env.VITE_FORM_BACKEND === "netlify";

export async function submitNetlifyForm<T>(
  functionName: "contact" | "submit-music",
  data: T
): Promise<{ success: true }> {
  const response = await fetch(`/.netlify/functions/${functionName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = (await response.json().catch(() => null)) as
    | { success?: boolean; error?: string }
    | null;

  if (!response.ok || !result?.success) {
    throw new Error(result?.error || "Unable to submit the form right now.");
  }

  return { success: true };
}
