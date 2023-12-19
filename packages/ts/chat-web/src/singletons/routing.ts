import { Router, RouterJson } from "goodrouter";

export interface RouteState {
  //
}
export const defaultRouteState: RouteState = {};

export class Routing {
  router = new Router<string>();
  routeState: RouteState = defaultRouteState;
  routeKey: string | null = null;
  routeParameters: Record<string, string> = {};
  window!: Window;

  setup(window: Window, routerConfig: RouterJson<string>) {
    this.window = window;
    this.router.loadFromJson(routerConfig);

    this.window.addEventListener("popstate", this.onPopState);

    this.sync();
  }

  teardown() {
    this.window.removeEventListener("popstate", this.onPopState);
  }

  getHref(routeKey: string, routeParameters: Record<string, string> = {}) {
    const href = this.router.stringifyRoute(routeKey, routeParameters);
    if (href === null) {
      throw new Error("route not found");
    }
    return href;
  }

  pushRoute(href: string, state: Partial<RouteState> = {}) {
    this.window.history.pushState(state, "", href);

    this.sync();

    const event = new Event("routeChanged");
    this.window.document.dispatchEvent(event);
  }
  replaceRoute(href: string, state: Partial<RouteState> = {}) {
    this.window.history.replaceState(state, "", href);

    this.sync();

    const event = new Event("routeChanged");
    this.window.document.dispatchEvent(event);
  }

  private sync() {
    this.routeState = { ...this.routeState, ...this.window.history.state };
    [this.routeKey, this.routeParameters] = this.router.parseRoute(this.window.location.pathname);
  }

  private onPopState = () => {
    this.sync();

    const event = new Event("routeChanged");
    this.window.document.dispatchEvent(event);
  };
}

export const routing = new Routing();
