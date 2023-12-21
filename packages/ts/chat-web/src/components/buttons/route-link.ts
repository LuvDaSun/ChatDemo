import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { RouteState, routing } from "../../singletons/index.js";

const componentName = "app-route-link";
export { Component as RouteLink };

@customElement(componentName)
class Component extends LitElement {
  @property()
  /**
   * name or key of the route where this link will take us
   */
  accessor routeKey = "";

  @property()
  /**
   * optional parameters for the route
   */
  accessor routeParameters: Record<string, string> = {};

  @property()
  /**
   * optional state for the route, this is not reflected in the generated url
   */
  accessor routeState: Partial<RouteState> = {};

  @property()
  /**
   * if we follow this link, will is replace the history entry or create a new one?
   */
  accessor replace = false;

  render() {
    const href = routing.getHref(this.routeKey, this.routeParameters);
    return html`<a href=${href} @click=${this.onClickAnchor}><slot></slot></a>`;
  }

  private onClickAnchor = (event: Event) => {
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
