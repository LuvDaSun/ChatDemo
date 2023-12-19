import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute } from "graphql";
import test from "node:test";
import * as operations from "./operations.js";
import { typeDefs } from "./type-defs.js";
import * as types from "./types.js";

test("hello", async () => {
  const resolvers = {
    Query: {
      messages(
        parent: unknown,
        {}: types.AllMessagesQueryVariables,
        context: unknown,
        info: unknown,
      ) {
        return ["hi"];
      },
    },
    Mutation: {
      newMessage(
        parent: unknown,
        { message }: types.NewMessageMutationVariables,
        context: unknown,
        info: unknown,
      ) {
        return true;
      },
    },
  };

  const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
  });

  {
    const result = await execute({
      schema,
      document: operations.newMessageOperation,
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
      document: operations.allMessagesOperation,
      variableValues: {} as types.AllMessagesQueryVariables,
    });
    const data = result.data as types.AllMessagesQuery;

    console.log(data);
  }
});
