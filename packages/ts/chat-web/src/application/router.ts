import { Router } from "goodrouter";

export function createRouter() {
  const router = new Router();

  router.insertRoute("home", "/");
  router.insertRoute("local", "/local");
  router.insertRoute("about", "/about");

  return router;
}
