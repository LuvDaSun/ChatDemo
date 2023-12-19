import { parse } from "graphql";

export const getMessagesOperation = parse(/* GraphQL */ `
  query GetMessages {
    messages
  }
`);

export const newMessageOperation = parse(/* GraphQL */ `
  mutation NewMessage($message: String!) {
    newMessage(message: $message)
  }
`);
