import * as common from "chat-api-common";
import { types } from "chat-common-gql";

export const resolvers = {
  Query: {
    messages(
      parent: unknown,
      {}: types.GetMessagesQuery,
      context: common.application.Context,
      info: common.application.Context,
    ) {
      return context.messageService.getMessages();
    },
  },
  Subscription: {
    messageEvents: {
      async *subscribe(
        parent: unknown,
        {}: types.SubscribeMessagesSubscriptionVariables,
        context: common.application.Context,
        info: unknown,
      ) {
        const controller = new AbortController();
        for await (const event of context.messageService.subscribeMessages(controller.signal)) {
          switch (event.type) {
            case "message-snapshot":
              yield {
                messageEvents: {
                  __typename: "MessageSnapshot",
                  messages: event.messages,
                } as types.MessageSnapshot,
              };
              break;

            case "message-add":
              yield {
                messageEvents: {
                  __typename: "MessageNew",
                  message: event.message,
                } as types.MessageNew,
              };
              break;
          }
        }
      },
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
