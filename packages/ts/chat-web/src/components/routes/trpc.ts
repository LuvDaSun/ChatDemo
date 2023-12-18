import { createTRPCProxyClient, createWSClient, wsLink } from "@trpc/client";
import { type Router } from "chat-api-trpc";
import immutable from "immutable";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatModel } from "../index.js";

const componentName = "app-trpc-route";
export { Component as TrpcRoute };

@customElement(componentName)
class Component extends LitElement {
  @state()
  accessor messages = immutable.List<string>([]);

  private wsClient = createWSClient({
    url: `ws://localhost:9090`,
  });

  private trpc = createTRPCProxyClient<Router>({
    links: [
      wsLink({
        client: this.wsClient,
      }),
    ],
  });

  render() {
    return html`
      <h1>Trpc</h1>
      <p>Trpc backend</p>
      <p>
        <app-chat-part
          .messageList=${this.messages}
          @chat-model=${this.onChatModelChatPart}
        ></app-chat-part>
      </p>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();

    this.trpc.messages.query().then((messages) => (this.messages = immutable.List(messages)));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private onChatModelChatPart = (event: CustomEvent) => {
    const model = event.detail as ChatModel;

    this.trpc.newMessage.mutate(model.message);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
