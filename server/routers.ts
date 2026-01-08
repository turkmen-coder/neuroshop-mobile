import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
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

  // Health check
  health: publicProcedure.query(() => ({ status: "ok" })),

  // Products
  products: router({
    list: publicProcedure
      .input(z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        category: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        const { getProductsPaginated } = await import('./db');
        const page = input?.page || 1;
        const limit = input?.limit || 20;
        const category = input?.category;
        return getProductsPaginated(page, limit, category);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const { getProductById } = await import('./db');
        return getProductById(input.id);
      }),
    
    categories: publicProcedure.query(async () => {
      const { getProductCategories } = await import('./db');
      return getProductCategories();
    }),
  }),

  // Personality
  personality: router({
    getProfile: publicProcedure.query(async () => {
      // Return default profile for non-authenticated users
      return {
        height: 170,
        weight: 70,
        bodyType: 'regular' as const,
        openness: 50,
        conscientiousness: 50,
        extraversion: 50,
        agreeableness: 50,
        neuroticism: 50,
      };
    }),
    
    updateProfile: publicProcedure
      .input(z.object({
        height: z.number().min(140).max(210).optional(),
        weight: z.number().min(40).max(150).optional(),
        bodyType: z.enum(['slim', 'regular', 'oversize']).optional(),
        openness: z.number().min(0).max(100).optional(),
        conscientiousness: z.number().min(0).max(100).optional(),
        extraversion: z.number().min(0).max(100).optional(),
        agreeableness: z.number().min(0).max(100).optional(),
        neuroticism: z.number().min(0).max(100).optional(),
      }))
      .mutation(async ({ input }) => {
        // For MVP, just return the input as confirmation
        // In production, this would update the database
        return { success: true, profile: input };
      }),
  }),
});

export type AppRouter = typeof appRouter;
