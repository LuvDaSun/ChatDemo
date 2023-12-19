import { gql } from "@apollo/client";

export const ALL_MESSAGES = gql`
  query AllMessages {
    messages
  }
`;

export const NEW_MESSAGE = gql`
  mutation NewMessage($message: String!) {
    newMessage(message: $message)
  }
`;
