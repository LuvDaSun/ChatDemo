import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute } from "graphql";
import test from "node:test";
import { OPERATIONS } from "./operations.js";
import { SCHEMA } from "./schema.js";
import * as types from "./types.js";

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
      } as types.NewMessageMutationVariables,
    });
    const data = result.data as types.NewMessageMutation;

    console.log(data);
  }

  {
    const result = await execute({
      schema,
      document: OPERATIONS,
      operationName: "AllMessages",
      variableValues: {} as types.AllMessagesQueryVariables,
    });
    const data = result.data as types.AllMessagesQuery;

    console.log(data);
  }
});
