import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ChatModel, defaultChatModel } from "../index.js";

const componentName = "app-chat-part";
export { Component as ChatPart };

@customElement(componentName)
class Component extends LitElement {
  static styles = css`
    .chat {
      width: 20em;
      border: 1px solid black;
    }
    app-chat-view {
      display: block;
      height: 20em;
      width: 100%;
    }
    app-chat-form {
      display: block;
      width: 100%;
    }
  `;

  @property({ attribute: false })
  accessor messageList: Iterable<string> = [];

  render() {
    return html`
      <div class="chat">
        <app-chat-view .messages=${this.messageList}></app-chat-view>
        <app-chat-form
          .initialModel=${defaultChatModel}
          @model=${this.onModelChatForm}
        ></app-chat-form>
      </div>
    `;
  }

  private onModelChatForm(event: CustomEvent) {
    const model = event.detail as ChatModel;

    const newEvent = new CustomEvent("chat-model", { detail: model });
    this.dispatchEvent(newEvent);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
