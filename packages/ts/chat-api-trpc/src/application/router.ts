import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { toObservable } from "../utils/index.js";
import { Context } from "./context.js";

export function createRouter(context: Context) {
  const trpc = initTRPC.create();

  return trpc.router({
    messages: trpc.procedure.subscription(() =>
      toObservable((signal) => context.messageService.subscribeMessages(signal)),
    ),

    newMessage: trpc.procedure
      .input(z.string())
      .mutation(async (options) => context.messageService.newMessage(options.input)),
  });
}

export type Router = ReturnType<typeof createRouter>;
