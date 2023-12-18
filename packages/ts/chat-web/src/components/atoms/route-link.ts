import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { RouteState, routing } from "../../singletons/index.js";

const componentName = "app-route-link";
export { Component as RouteLink };

@customElement(componentName)
class Component extends LitElement {
  @property()
  accessor routeKey = "";

  @property()
  accessor routeParameters: Record<string, string> = {};

  @property()
  accessor routeState: Partial<RouteState> = {};

  @property()
  accessor replace = false;

  render() {
    const href = routing.getHref(this.routeKey, this.routeParameters);
    return html`<a href=${href}><slot></slot></a>`;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("click", this.onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this.onClick);
  }

  private onClick = (event: Event) => {
    const href = routing.getHref(this.routeKey, this.routeParameters);

    event.preventDefault();

    if (this.replace) {
      routing.replaceRoute(href, this.routeState);
    } else {
      routing.pushRoute(href, this.routeState);
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
