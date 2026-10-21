import { initTRPC } from "@trpc/server";
import superjson from "superjson";

import { prisma } from "./db";

export const createTRPCContext = async () => {
  return { prisma };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
