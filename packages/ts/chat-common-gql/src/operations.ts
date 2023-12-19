import { parse } from "graphql";

export const ALL_MESSAGES = parse(/* GraphQL */ `
  query AllMessages {
    messages
  }
`);

export const NEW_MESSAGE = parse(/* GraphQL */ `
  mutation NewMessage($message: String!) {
    newMessage(message: $message)
  }
`);
