import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { sendEmail, formatContactFormEmail, formatSubmissionFormEmail } from "./email";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  forms: router({
    submitContact: publicProcedure
      .input(
        z.object({
          name: z.string().trim().min(1, "Name is required"),
          company: z.string().trim().optional(),
          email: z.string().email("Invalid email"),
          phone: z.string().trim().optional(),
          subject: z.string().trim().min(1, "Subject is required"),
          message: z.string().trim().min(1, "Message is required"),
        })
      )
      .mutation(async ({ input }) => {
        const success = await sendEmail(formatContactFormEmail(input));
        if (!success) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unable to deliver your message right now.",
          });
        }
        return { success: true } as const;
      }),

    submitMusic: publicProcedure
      .input(
        z.object({
          artistName: z.string().trim().min(1, "Artist name is required"),
          contactName: z.string().trim().optional(),
          email: z.string().email("Invalid email"),
          phone: z.string().trim().optional(),
          genre: z.string().trim().min(1, "Genre is required"),
          spotifyUrl: z.string().url("Invalid music URL"),
          message: z.string().trim().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const success = await sendEmail(formatSubmissionFormEmail(input));
        if (!success) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unable to deliver your submission right now.",
          });
        }
        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
