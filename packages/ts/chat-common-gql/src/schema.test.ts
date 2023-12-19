import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute } from "graphql";
import test from "node:test";
import {
  AllMessagesQuery,
  AllMessagesQueryVariables,
  NewMessageMutation,
  NewMessageMutationVariables,
} from "./types.js";
import { OPERATIONS } from "./operations.js";
import { SCHEMA } from "./schema.js";

test("hello", async () => {
  const resolvers = {
    Query: {
      messages() {
        return ["hi"];
      },
    },
    Mutation: {
      newMessage(message: string) {
        return true;
      },
    },
  };

  const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [SCHEMA],
  });

  {
    const result = await execute({
      schema,
      document: OPERATIONS,
      operationName: "NewMessage",
      variableValues: {
        message: "hi!!",
      } as NewMessageMutationVariables,
    });
    const data = result.data as NewMessageMutation;

    console.log(data);
  }

  {
    const result = await execute({
      schema,
      document: OPERATIONS,
      operationName: "AllMessages",
      variableValues: {} as AllMessagesQueryVariables,
    });
    const data = result.data as AllMessagesQuery;

    console.log(data);
  }
});
