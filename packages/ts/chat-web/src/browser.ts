import { Router } from "goodrouter";
import "./components/index.js";

export interface RouteState {
  //
}
const defaultRouteState: RouteState = {};

declare global {
  interface Window {
    router: Router<string>;
    routeState: RouteState;
    pushRoute: (pathName: string, state?: Partial<RouteState>) => void;
    replaceRoute: (pathName: string, state?: Partial<RouteState>) => void;
  }
}

window.router = new Router();
window.routeState = { ...defaultRouteState, ...window.history.state };
window.pushRoute = (href: string, state = {}) => {
  history.pushState({ ...window.routeState, ...state }, "", href);

  window.routeState = { ...defaultRouteState, ...window.history.state };

  const event = new Event("routeChanged");
  window.dispatchEvent(event);
};
window.replaceRoute = (href: string, state = {}) => {
  history.replaceState({ ...window.routeState, ...state }, "", href);

  window.routeState = { ...defaultRouteState, ...window.history.state };

  const event = new Event("routeChanged");
  window.dispatchEvent(event);
};

window.addEventListener("popstate", () => {
  window.routeState = { ...defaultRouteState, ...window.history.state };

  const event = new Event("routeChanged");
  window.dispatchEvent(event);
});
