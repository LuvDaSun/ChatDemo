import * as common from "chat-api-common";
import { types } from "chat-common-grpc";

export function createHandlers(context: common.application.Context): types.ChatDemoHandlers {
  return {
    GetMessages(call, callback) {
      const messages = context.messageService.getMessages();
      callback(null, { values: messages });
    },
    NewMessage(call, callback) {
      context.messageService.newMessage(call.request.value);
      console.log(call.request.value);
      callback(null, {});
    },
    async SubscribeMessageEvents(call) {
      const controller = new AbortController();
      call.addListener("finish", () => controller.abort());
      for await (const event of context.messageService.subscribeMessages(controller.signal)) {
        switch (event.type) {
          case "message-snapshot":
            await new Promise((resolve) =>
              call.write(
                {
                  type: "snapshot",
                  snapshot: {
                    messages: event.messages,
                  },
                },
                resolve,
              ),
            );
            break;
          case "message-add":
            await new Promise((resolve) =>
              call.write(
                {
                  type: "new",
                  new: {
                    message: event.message,
                  },
                },
                resolve,
              ),
            );
            break;
        }
      }
    },
  };
}
