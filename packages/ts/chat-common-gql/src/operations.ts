import { parse } from "graphql";

export const operations = parse(/* GraphQL */ `
  query AllMessages {
    messages
  }
  mutation NewMessage($message: String!) {
    newMessage(message: $message)
  }
`);
