import { parse } from "graphql";

export const OPERATIONS = parse(/* GraphQL */ `
  query AllMessages {
    messages
  }
  mutation NewMessage($message: String!) {
    newMessage(message: $message)
  }
`);
