import * as common from "chat-api-common";
import { types } from "chat-common-gql";

export const resolvers = {
  Query: {
    messages(
      parent: unknown,
      {}: types.AllMessagesQueryVariables,
      context: unknown,
      info: common.application.Context,
    ) {
      return ["hi"];
    },
  },
  Mutation: {
    newMessage(
      parent: unknown,
      { message }: types.NewMessageMutationVariables,
      context: common.application.Context,
      info: unknown,
    ) {
      return true;
    },
  },
};
