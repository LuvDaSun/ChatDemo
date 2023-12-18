import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const componentName = "app-chat-form";
export { Component as ChatForm, Model as ChatModel, defaultModel as defaultChatModel };

interface Model {
  message: string;
}

const defaultModel: Model = {
  message: "",
};

@customElement(componentName)
class Component extends LitElement {
  static styles = css`
    form {
      padding: 0;
      margin: 0;
      border: 0;
      width: 100%;
    }
    input {
      padding: 0;
      margin: 0;
      border: 0;
      width: 100%;
      font-size: inherit;
      font-family: inherit;
    }
  `;

  @property({ attribute: false })
  accessor model = defaultModel;

  render() {
    const { model } = this;

    return html`
      <form @submit=${this.onSubmitForm} @input=${this.onInputForm}>
        <input name="message" type="text" .value=${model.message} />
      </fieldset>
    `;
  }

  private onInputForm = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLInputElement;

    switch (target.name) {
      case "message": {
        const value = target.value.trim();
        this.model = { ...this.model, ...{ message: value } };
        break;
      }
    }
  };

  private onSubmitForm = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const event = new Event("submit");
    this.dispatchEvent(event);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
