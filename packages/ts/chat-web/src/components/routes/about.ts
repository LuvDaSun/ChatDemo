import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

const componentName = "app-about-route";
export { Component as AboutRoute };

@customElement(componentName)
class Component extends LitElement {
  render() {
    return html`
      <h1>About</h1>
      <p>Created by LuvDaSun</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
