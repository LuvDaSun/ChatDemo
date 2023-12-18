import { initTRPC } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { createBufferedIterable } from "buffered-iterable";
import { createIterableFanout } from "iterable-fanout";
import { z } from "zod";
import { State } from "./state.js";

export type MessageEvent =
  | {
      type: "message-snapshot";
      messages: string[];
    }
  | {
      type: "message-add";
      message: string;
    };

export function createRouter(state: State) {
  const messageBuffer = createBufferedIterable<string>();
  const messageFanout = createIterableFanout(messageBuffer);

  const trpc = initTRPC.create();

  return trpc.router({
    messages: trpc.procedure.subscription(() => {
      return observable<MessageEvent>((a) => {
        a.next({
          type: "message-snapshot",
          messages: state.messages,
        });

        const controller = new AbortController();
        (async () => {
          for await (const message of messageFanout.fork(controller.signal)) {
            a.next({
              type: "message-add",
              message,
            });
          }
        })().then(
          () => a.complete(),
          (error) => a.error(error),
        );

        return () => controller.abort();
      });
    }),

    newMessage: trpc.procedure.input(z.string()).mutation(async (options) => {
      state.messages.push(options.input);
      messageBuffer.push(options.input);
    }),
  });
}

export type Router = ReturnType<typeof createRouter>;
