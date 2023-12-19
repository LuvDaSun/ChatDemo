import { parse } from "graphql";

export const allMessagesOperation = parse(/* GraphQL */ `
  query AllMessages {
    messages
  }
`);

export const newMessageOperation = parse(/* GraphQL */ `
  mutation NewMessage($message: String!) {
    newMessage(message: $message)
  }
`);
