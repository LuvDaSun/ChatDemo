import { createBufferedIterable } from "buffered-iterable";
import { createIterableFanout } from "iterable-fanout";

export interface MessageState {
  messages: string[];
}

export type MessageEvent =
  | {
      type: "message-snapshot";
      messages: string[];
    }
  | {
      type: "message-add";
      message: string;
    };

export class MessageService {
  private state: MessageState = { messages: [] };
  private buffer = createBufferedIterable<MessageEvent>();
  private fanout = createIterableFanout(this.applyReducer(this.buffer));

  async *subscribeMessages(signal: AbortSignal): AsyncIterable<MessageEvent> {
    yield {
      type: "message-snapshot",
      messages: this.state.messages,
    };

    yield* this.fanout.fork(signal);
  }

  newMessage(message: string) {
    this.buffer.push({
      type: "message-add",
      message,
    });
  }

  private async *applyReducer(iterable: AsyncIterable<MessageEvent>) {
    for await (const event of iterable) {
      this.state = reduce(this.state, event);
      yield event;
    }
  }
}

function reduce(state: MessageState, event: MessageEvent): MessageState {
  switch (event.type) {
    case "message-snapshot": {
      return {
        messages: event.messages,
      };
    }

    case "message-add": {
      return {
        messages: [...state.messages, event.message],
      };
    }
  }
}
