import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute, subscribe } from "graphql";
import test from "node:test";
import * as operations from "./operations.js";
import { typeDefs } from "./type-defs.js";
import * as types from "./types.js";

test("hello", async () => {
  const resolvers = {
    Query: {
      messages(
        parent: unknown,
        {}: types.GetMessagesQueryVariables,
        context: unknown,
        info: unknown,
      ) {
        return ["hi"];
      },
    },
    Subscription: {
      messageEvents: {
        async *subscribe(
          parent: unknown,
          {}: types.SubscribeMessagesSubscriptionVariables,
          context: unknown,
          info: unknown,
        ) {
          yield {
            messageEvents: {
              __typename: "MessageSnapshot",
              messages: ["hi"],
            } as types.MessageSnapshot,
          };
          yield {
            messageEvents: {
              __typename: "MessageNew",
              message: "ho",
            } as types.MessageNew,
          };
        },
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
      document: operations.getMessagesOperation,
      variableValues: {} as types.GetMessagesQueryVariables,
    });
    const data = result.data as types.GetMessagesQuery;

    console.log(data);
  }

  {
    const result = await subscribe({
      schema,
      document: operations.subscribeMessagesOperation,
      variableValues: {} as types.SubscribeMessagesSubscriptionVariables,
    });

    if (Symbol.asyncIterator in result) {
      for await (const event of result) {
        const data = event.data as types.SubscribeMessagesSubscription;

        console.log(data);
      }
    }
  }
});
