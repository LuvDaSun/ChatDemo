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
    type: String!
    messages: [String!]!
  }
  type MessageNew {
    type: String!
    message: String!
  }
  union MessageEvent = MessageSnapshot | MessageNew
`);
