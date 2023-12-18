import * as immutable from "immutable";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatForm, defaultChatModel } from "../index.js";

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

  @state()
  accessor messages = immutable.List<string>([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ]);

  @state()
  accessor chatModel = defaultChatModel;

  render() {
    return html`
      <div class="chat">
        <app-chat-view .messages=${this.messages}></app-chat-view>
        <app-chat-form .model=${this.chatModel} @submit=${this.onSubmitChat}></app-chat-form>
      </div>
    `;
  }

  private onSubmitChat(event: Event) {
    const target = event.target as ChatForm;
    const { model } = target;

    this.messages = this.messages.push(model.message);

    this.chatModel = defaultChatModel;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
