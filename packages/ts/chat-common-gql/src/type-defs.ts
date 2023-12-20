import { parse } from "graphql";

export const typeDefs = parse(/* GraphQL */ `
  type Query {
    messages: [String!]!
  }
  type Subscription {
    messageEvents: MessageEvent!
  }
  type Mutation {
    newMessage(message: String!): Boolean!
  }

  type MessageSnapshot {
    messages: [String!]!
  }

  type MessageNew {
    message: String!
  }

  union MessageEvent = MessageSnapshot | MessageNew
`);
