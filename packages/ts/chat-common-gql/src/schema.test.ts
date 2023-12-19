import { execute, parse } from "graphql";
import test from "node:test";
import { schema } from "./schema.js";

test("hello", async () => {
  const mutation = parse(/* GraphQL */ `
    mutation ($message: String!) {
      newMessage(message: $message)
    }
  `);

  const query = parse(/* GraphQL */ `
    query {
      messages
    }
  `);

  {
    const result = await execute({
      schema,
      document: mutation,
      variableValues: {
        message: "hi!!",
      },
    });

    console.log(result);
  }

  {
    const result = await execute({
      schema,
      document: query,
    });

    console.log(result);
  }
});
