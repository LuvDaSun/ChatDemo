import { parse } from "graphql";

export const SCHEMA = parse(/* GraphQL */ `
  type Query {
    messages: [String!]!
  }
  type Mutation {
    newMessage(message: String!): Boolean!
  }
`);
