import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

const componentName = "app-home-route";
export { Component as HomeRoute };

@customElement(componentName)
class Component extends LitElement {
  render() {
    return html`
      <h1>Home</h1>
      <p>Welcome</p>
      <p>
        <app-route-link routeKey="about">About</app-route-link>
      </p>
      <p>
        <app-chat-part></app-chat-part>
      </p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
