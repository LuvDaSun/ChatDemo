import immutable from "immutable";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatModel } from "../index.js";

const componentName = "app-local-route";
export { Component as LocalRoute };

@customElement(componentName)
class Component extends LitElement {
  @state()
  accessor messages = immutable.List<string>([]);

  render() {
    return html`
      <h1>Local</h1>
      <p>In memory chat, no server</p>
      <p>
        <app-chat-part
          .messageList=${this.messages}
          @chat-model=${this.onChatModelChatPart}
        ></app-chat-part>
      </p>
    `;
  }

  private onChatModelChatPart = (event: CustomEvent) => {
    const model = event.detail as ChatModel;

    this.messages = this.messages.push(model.message);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
