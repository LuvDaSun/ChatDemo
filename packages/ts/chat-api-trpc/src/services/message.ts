import { createBufferedIterable } from "buffered-iterable";
import { createIterableFanout } from "iterable-fanout";

export interface State {
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
  private state: State = { messages: [] };
  private buffer = createBufferedIterable<string>();
  private fanout = createIterableFanout(this.buffer);

  async *subscribeMessages(signal: AbortSignal): AsyncIterable<MessageEvent> {
    yield {
      type: "message-snapshot",
      messages: this.state.messages,
    };

    for await (const message of this.fanout.fork(signal)) {
      yield {
        type: "message-add",
        message,
      };
    }
  }

  newMessage(message: string) {
    this.state.messages.push(message);
    this.buffer.push(message);
  }
}
