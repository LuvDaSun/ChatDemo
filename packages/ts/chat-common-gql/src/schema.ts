import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefinitions = /* GraphQL */ `
  type Query {
    messages: [String!]!
  }

  type Mutation {
    newMessage(message: String!): Boolean!
  }
`;

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
