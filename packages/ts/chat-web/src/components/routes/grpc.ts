import * as commonGrpc from "chat-common-grpc/web";
import { ClientReadableStream } from "grpc-web";
import immutable from "immutable";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatModel } from "../forms/index.js";

const componentName = "app-grpc-route";
export { Component as grpcRoute };

@customElement(componentName)
class Component extends LitElement {
  @state()
  accessor messages = immutable.List<string>([]);

  render() {
    return html`
      <h1>grpc</h1>
      <p>grpc backend</p>
      <p>
        <app-chat-part
          .messageList=${this.messages}
          @chat-model=${this.onChatModelChatPart}
        ></app-chat-part>
      </p>
    `;
  }

  private client = new commonGrpc.ChatDemoClient("http://localhost:9900");

  private stream!: ClientReadableStream<commonGrpc.MessageEvent>;

  connectedCallback(): void {
    this.stream = this.client.subscribeMessageEvents(new commonGrpc.Nothing(), {});

    this.stream.on("data", (event) => {
      const eventSnapshot = event.getSnapshot();
      if (eventSnapshot != null) {
        this.messages = immutable.List(eventSnapshot.getMessagesList());
      }

      const eventNew = event.getNew();
      if (eventNew != null) {
        this.messages = this.messages.push(eventNew.getMessage());
      }
    });

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    this.stream.cancel();

    super.disconnectedCallback();
  }

  private onChatModelChatPart = (event: CustomEvent) => {
    const model = event.detail as ChatModel;

    (async () => {
      const response = await new Promise<commonGrpc.Nothing>((resolve, reject) =>
        this.client.newMessage(
          new commonGrpc.Message().setValue(model.message),
          undefined,
          (error, response) => (error == null ? resolve(response) : reject(error)),
        ),
      );
    })();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
