import * as common from "chat-api-common";
import { types } from "chat-common-gql";

export const resolvers = {
  Query: {
    messages(
      parent: unknown,
      {}: types.AllMessagesQueryVariables,
      context: common.application.Context,
      info: common.application.Context,
    ) {
      return context.messageService.getMessages();
    },
  },
  Mutation: {
    newMessage(
      parent: unknown,
      { message }: types.NewMessageMutationVariables,
      context: common.application.Context,
      info: unknown,
    ) {
      context.messageService.newMessage(message);
      return true;
    },
  },
};
