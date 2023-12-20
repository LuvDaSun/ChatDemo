import * as urql from "@urql/core";
import { operations, types } from "chat-common-gql";
import immutable from "immutable";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatModel } from "../forms/index.js";

const componentName = "app-gql-route";
export { Component as GqlRoute };

@customElement(componentName)
class Component extends LitElement {
  @state()
  accessor messages = immutable.List<string>([]);

  render() {
    return html`
      <h1>Gql</h1>
      <p>Gql backend</p>
      <p>
        <app-chat-part
          .messageList=${this.messages}
          @chat-model=${this.onChatModelChatPart}
        ></app-chat-part>
      </p>
    `;
  }

  private client: urql.Client = new urql.Client({
    url: "http://localhost:4000/graphql",
    fetchSubscriptions: true,
    exchanges: [urql.fetchExchange],
  });

  private unsubscribe!: () => void;

  connectedCallback(): void {
    (async () => {
      const subscription = this.client
        .subscription(
          operations.subscribeMessagesOperation,
          {} as types.SubscribeMessagesSubscriptionVariables,
        )
        .subscribe((result) => {
          const data = result.data as types.SubscribeMessagesSubscription;
          switch (data.messageEvents.__typename) {
            case "MessageSnapshot": {
              this.messages = immutable.List(data.messageEvents.messages);
              break;
            }

            case "MessageNew": {
              this.messages = this.messages.push(data.messageEvents.message);
              break;
            }
          }
        });

      this.unsubscribe = subscription.unsubscribe;
    })();

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    this.unsubscribe();

    super.disconnectedCallback();
  }

  private onChatModelChatPart = (event: CustomEvent) => {
    const model = event.detail as ChatModel;

    (async () => {
      const result = await this.client
        .mutation(operations.newMessageOperation, {
          message: model.message,
        } as types.NewMessageMutationVariables)
        .toPromise();
      const data = result.data as types.NewMessageMutation;
    })();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
