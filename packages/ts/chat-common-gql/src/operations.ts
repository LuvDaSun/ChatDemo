import { parse } from "graphql";

export const getMessagesOperation = parse(/* GraphQL */ `
  query GetMessages {
    messages
  }
`);

export const subscribeMessagesOperation = parse(/* GraphQL */ `
  subscription SubscribeMessages {
    messageEvents {
      ... on MessageSnapshot {
        type
        messages
      }
      ... on MessageNew {
        type
        message
      }
    }
  }
`);

export const newMessageOperation = parse(/* GraphQL */ `
  mutation NewMessage($message: String!) {
    newMessage(message: $message)
  }
`);
