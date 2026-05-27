import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { sendEmail, formatContactFormEmail, formatSubmissionFormEmail } from "./email";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  forms: router({
    submitContact: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          company: z.string().min(1, "Company is required"),
          email: z.string().email("Invalid email"),
          phone: z.string().min(1, "Phone is required"),
          subject: z.string().min(1, "Subject is required"),
          message: z.string().min(1, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        const emailPayload = formatContactFormEmail(input);
        const success = await sendEmail(emailPayload);
        return { success };
      }),

    submitMusic: publicProcedure
      .input(
        z.object({
          artistName: z.string().min(1, "Artist name is required"),
          email: z.string().email("Invalid email"),
          phone: z.string().min(1, "Phone is required"),
          genre: z.string().min(1, "Genre is required"),
          spotifyUrl: z.string().url("Invalid Spotify URL"),
          message: z.string().min(1, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        const emailPayload = formatSubmissionFormEmail(input);
        const success = await sendEmail(emailPayload);
        return { success };
      }),
  }),
});

export type AppRouter = typeof appRouter;
