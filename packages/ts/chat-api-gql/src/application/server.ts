import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import * as common from "chat-api-common";
import { SCHEMA, types } from "chat-common-gql";
import express from "express";
import http from "http";

const resolvers = {
  Query: {
    messages(
      parent: unknown,
      {}: types.AllMessagesQueryVariables,
      context: unknown,
      info: common.application.Context,
    ) {
      return ["hi"];
    },
  },
  Mutation: {
    newMessage(
      parent: unknown,
      { message }: types.NewMessageMutationVariables,
      context: common.application.Context,
      info: unknown,
    ) {
      return true;
    },
  },
};

export class Server {
  private readonly apolloServer = new ApolloServer<common.application.Context>({
    typeDefs: SCHEMA,
    resolvers,
  });
  private readonly express = express();

  constructor(private readonly context: common.application.Context) {}

  public get requestHandler(): http.RequestListener {
    return this.express;
  }

  public async setup() {
    await this.apolloServer.start();

    this.express.use(
      expressMiddleware<common.application.Context>(this.apolloServer, {
        context: async () => this.context,
      }),
    );
  }

  public async teardown() {
    await this.apolloServer.stop();
  }
}
