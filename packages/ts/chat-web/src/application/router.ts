import { Router } from "goodrouter";

// when adding a route, please restart the server!
export function createRouter() {
  const router = new Router();

  router.insertRoute("home", "/");
  router.insertRoute("local", "/local");
  router.insertRoute("about", "/about");

  return router;
}
