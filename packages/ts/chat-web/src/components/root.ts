import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";

const componentName = "app-root";
export { Component as Root };

@customElement(componentName)
class Component extends LitElement {
  render() {
    const [route, routeParameters] = window.router.parseRoute(window.location.pathname);

    const tagName = `app-${route ?? "default"}-route`;
    const element = window.document.createElement(tagName);
    for (const [key, value] of Object.entries(routeParameters)) {
      element.setAttribute(key, value);
    }
    return element;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("routeChanged", this.onRouteChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("routeChanged", this.onRouteChanged);
  }

  private onRouteChanged = () => {
    this.requestUpdate();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
