import { Router } from "goodrouter";

// when adding a route, please restart the server!
export function createRouter() {
  const router = new Router();

  router.insertRoute("home", "/");
  router.insertRoute("about", "/about");
  router.insertRoute("local", "/local");
  router.insertRoute("trpc", "/trpc");
  router.insertRoute("gql", "/gql");
  router.insertRoute("grpc", "/grpc");

  return router;
}
