import { initgql } from "@gql/server";
import * as common from "chat-api-common";
import { z } from "zod";
import { toObservable } from "../utils/index.js";

export function createRouter(context: common.application.Context) {
  const gql = initgql.create();

  return gql.router({
    messages: gql.procedure.subscription(() =>
      toObservable((signal) => context.messageService.subscribeMessages(signal)),
    ),

    newMessage: gql.procedure
      .input(z.string())
      .mutation(async (options) => context.messageService.newMessage(options.input)),
  });
}

export type Router = ReturnType<typeof createRouter>;
