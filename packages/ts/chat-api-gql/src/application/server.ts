import * as common from "chat-api-common";
import { typeDefs } from "chat-common-gql";
import { createSchema, createYoga, YogaServerInstance } from "graphql-yoga";
import http from "http";
import { resolvers } from "./resolvers.js";

export class Server {
  private readonly yoga: YogaServerInstance<{}, common.application.Context>;

  constructor(private readonly context: common.application.Context) {
    this.yoga = createYoga({
      schema: createSchema({ typeDefs, resolvers }),
      context,
    });
  }

  public get requestHandler(): http.RequestListener {
    return this.yoga;
  }
}
