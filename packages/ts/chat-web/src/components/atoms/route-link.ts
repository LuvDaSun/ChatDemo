import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { RouteState } from "../../browser.js";

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

  getHref() {
    return window.router.stringifyRoute(this.routeKey, this.routeParameters);
  }

  render() {
    const href = this.getHref();
    return html`<a href=${href}><slot></slot></a>`;
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener("click", this.onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    window.removeEventListener("click", this.onClick);
  }

  private onClick = (event: Event) => {
    const href = this.getHref();
    if (href == null) {
      throw new Error("invalid route");
    }

    let state = { ...this.routeState, ...window.routeState };

    event.preventDefault();

    if (this.replace) {
      window.replaceRoute(href, state);
    } else {
      window.pushRoute(href, state);
    }
  };
}
