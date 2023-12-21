import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

// this is a special route! We will end up here when there is no route found for
// whatever reason. This will only happen when we make a mistake, under normal operation
// this never happens

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
