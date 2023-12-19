import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

const componentName = "app-default-route";
export { Component as DefaultRoute };

@customElement(componentName)
class Component extends LitElement {
  render() {
    return html`
      <h1>Not found</h1>
      <p>Please try a different route</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
