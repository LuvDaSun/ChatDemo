import { execute } from "graphql";
import test from "node:test";
import {
  AllMessagesQuery,
  AllMessagesQueryVariables,
  NewMessageMutation,
  NewMessageMutationVariables,
} from "./graphql.js";
import { ALL_MESSAGES, NEW_MESSAGE } from "./operations.js";
import { schema } from "./schema.js";

test("hello", async () => {
  {
    const result = await execute({
      schema,
      document: NEW_MESSAGE,
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
      document: ALL_MESSAGES,
      variableValues: {} as AllMessagesQueryVariables,
    });

    const data = result.data as AllMessagesQuery;

    console.log(data);
  }
});
