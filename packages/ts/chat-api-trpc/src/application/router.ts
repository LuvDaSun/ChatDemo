import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { State } from "./state.js";

export function createRouter(state: State) {
  const trpc = initTRPC.create();

  return trpc.router({
    messages: trpc.procedure.query(() => {
      return state.messages;
    }),

    newMessage: trpc.procedure.input(z.string()).mutation(async (options) => {
      state.messages.push(options.input);
    }),
  });
}

export type Router = ReturnType<typeof createRouter>;
