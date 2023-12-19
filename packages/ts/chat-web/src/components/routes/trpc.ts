import { createTRPCProxyClient, createWSClient, wsLink } from "@trpc/client";
import { type Router } from "chat-api-trpc";
import immutable from "immutable";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatModel } from "../forms/index.js";

const componentName = "app-trpc-route";
export { Component as TrpcRoute };

@customElement(componentName)
class Component extends LitElement {
  @state()
  accessor messages = immutable.List<string>([]);

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

  private trpc?: ReturnType<typeof createTRPCProxyClient<Router>>;
  private wsClient?: ReturnType<typeof createWSClient>;
  private unsubscribe?: () => void;

  connectedCallback(): void {
    this.wsClient = createWSClient({
      url: `ws://localhost:3000`,
    });
    this.trpc = createTRPCProxyClient<Router>({
      links: [
        wsLink({
          client: this.wsClient,
        }),
      ],
    });
    const { unsubscribe } = this.trpc.messages.subscribe(undefined, {
      onData: (event) => {
        switch (event.type) {
          case "message-snapshot":
            this.messages = immutable.List(event.messages);
            break;

          case "message-add":
            this.messages = this.messages.push(event.message);
            break;
        }
      },
    });
    this.unsubscribe = unsubscribe;

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this.unsubscribe!();
    this.wsClient!.close();
  }

  private onChatModelChatPart = (event: CustomEvent) => {
    const model = event.detail as ChatModel;

    this.trpc!.newMessage.mutate(model.message);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
