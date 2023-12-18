import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

const componentName = "app-chat-form";
export { Component as ChatForm, Model as ChatModel, defaultModel as defaultChatModel };

interface Model {
  message: string;
}

interface FormModel {
  message: string;
}

interface FormError {
  message: boolean;
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
      border: 1px solid black;
      width: 100%;
      font-size: inherit;
      font-family: inherit;
    }
    input.error {
      border: red;
    }
  `;

  @property({
    attribute: false,
  })
  accessor initialModel = defaultModel;

  @state()
  accessor formModel!: FormModel;

  @state()
  accessor formError!: FormError;

  render() {
    const { formModel } = this;

    return html`
      <form @submit=${this.onSubmitForm} @input=${this.onInputForm}>
        <input name="message" type="text" .value=${formModel.message}  />
      </fieldset>
    `;
  }

  willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has("initialModel")) {
      this.reset();
    }
  }

  reset() {
    this.setModel(this.initialModel);
  }

  private setModel(model: Model) {
    const formModel = {} as FormModel;
    const formError = {} as FormError;
    {
      const member = "message";

      const value = model[member];
      formModel[member] = value;
      formError[member] = false;
    }

    this.formError = formError;
    this.formModel = formModel;
  }

  private getModel(): Model | undefined {
    const model = {} as Model;
    const formModel = this.formModel;

    {
      const member = "message";

      this.formError[member] = false;
      const value = formModel[member].trim();
      if (value === "") {
        this.formError[member] = true;
        return;
      }

      model[member] = value;
    }

    return model;
  }

  private onInputForm = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLInputElement;
    const member = target.name as keyof FormModel;

    switch (target.name) {
      case "message": {
        this.formError[member] = false;
        const value = target.value.trim();
        this.formModel = { ...this.formModel, ...{ [member]: value } };
        break;
      }
    }
  };

  private onSubmitForm = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();

    const model = this.getModel();

    const event = new CustomEvent("model", { detail: model });
    this.dispatchEvent(event);

    this.reset();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
