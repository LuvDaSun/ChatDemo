import { parse } from "graphql";

export const getMessagesOperation = parse(/* GraphQL */ `
  query GetMessages {
    messages
  }
`);

export const subscribeMessagesOperation = parse(/* GraphQL */ `
  subscription SubscribeMessages {
    messageEvents {
      __typename
      ... on MessageSnapshot {
        messages
      }
      ... on MessageNew {
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
