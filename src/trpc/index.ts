import { db } from '@/lib/db';
import { privateProcedure, router } from './trpc';
import * as z from 'zod';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
  getFile: privateProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const file = await db.file.findFirst({
        where: {
          userId,
          key: input.key,
        },
      });

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      return file;
    }),
});

export type AppRouter = typeof appRouter;
