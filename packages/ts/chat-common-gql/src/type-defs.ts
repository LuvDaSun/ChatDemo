import { parse } from "graphql";

export const typeDefs = parse(/* GraphQL */ `
  type Query {
    messages: [String!]!
  }
  type Mutation {
    newMessage(message: String!): Boolean!
  }
`);
