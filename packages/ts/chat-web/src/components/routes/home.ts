import immutable from "immutable";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ChatModel } from "../index.js";

const componentName = "app-home-route";
export { Component as HomeRoute };

@customElement(componentName)
class Component extends LitElement {
  @state()
  accessor messages = immutable.List<string>([]);

  render() {
    return html`
      <h1>Home</h1>
      <p>Welcome</p>
      <p>
        <app-route-link routeKey="local">Local</app-route-link>
        -
        <app-route-link routeKey="trpc">Trpc</app-route-link>
        -
        <app-route-link routeKey="about">About</app-route-link>
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
