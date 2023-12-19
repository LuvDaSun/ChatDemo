import { execute } from "graphql";
import test from "node:test";
import { ALL_MESSAGES, NEW_MESSAGE } from "./operations.js";
import { schema } from "./schema.js";

test("hello", async () => {
  const newMessage = NEW_MESSAGE;
  const allMessages = ALL_MESSAGES;

  {
    const result = await execute({
      schema,
      document: newMessage,
      variableValues: {
        message: "hi!!",
      },
    });

    console.log(result);
  }

  {
    const result = await execute({
      schema,
      document: allMessages,
    });

    console.log(result);
  }
});
