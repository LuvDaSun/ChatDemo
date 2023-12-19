import { operations, types } from "chat-common-gql";
import { request } from "graphql-request";
import immutable from "immutable";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatModel } from "../index.js";

const componentName = "app-gql-route";
export { Component as GqlRoute };

const gqlEndpoint = "http://localhost:4000";

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

  connectedCallback(): void {
    (async () => {
      const result = (await request(
        gqlEndpoint,
        operations.allMessagesOperation,
        {} as types.AllMessagesQueryVariables,
      )) as types.AllMessagesQuery;

      this.messages = immutable.List(result.messages);
    })();

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  private onChatModelChatPart = (event: CustomEvent) => {
    const model = event.detail as ChatModel;

    (async () => {
      const result = (await request(gqlEndpoint, operations.newMessageOperation, {
        message: model.message,
      } as types.NewMessageMutationVariables)) as types.NewMessageMutation;
    })();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
