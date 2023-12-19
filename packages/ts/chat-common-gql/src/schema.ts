import { makeExecutableSchema } from "@graphql-tools/schema";
import { parse } from "graphql";

const typeDefinitions = parse(/* GraphQL */ `
  type Query {
    messages: [String!]!
  }
  type Mutation {
    newMessage(message: String!): Boolean!
  }
`);

const resolvers = {
  Query: {
    messages() {
      return ["hi"];
    },
  },
  Mutation: {
    newMessage(message: string) {
      return true;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
