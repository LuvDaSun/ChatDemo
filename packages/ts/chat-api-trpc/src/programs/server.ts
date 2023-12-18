import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import * as yargs from "yargs";
import * as application from "../application/index.js";
import { Context } from "../application/index.js";

export function registerServerProgram(argv: yargs.Argv) {
  return argv.command(
    "server",
    "Start chat-api-trpc server",
    (yargs) =>
      yargs.option("port", {
        description: "Port to start the server on",
        type: "number",
        default: 8080,
      }),
    (argv) => main(argv as MainOptions),
  );
}

interface MainOptions {
  port: number;
}

async function main(options: MainOptions) {
  const { port } = options;

  console.log("Starting server...");

  const context = new Context();
  const router = application.createRouter(context);

  const server = createServer();
  const wss = new WebSocketServer({ server });
  const wssHandler = applyWSSHandler({ wss, router });

  await new Promise<void>((resolve, reject) => server.listen(port, () => resolve()));

  console.log("Server started");
  try {
    await new Promise<void>((resolve) => {
      const abort = () => {
        process.removeListener("SIGINT", abort);
        process.removeListener("SIGTERM", abort);

        resolve();
      };
      process.addListener("SIGINT", abort);
      process.addListener("SIGTERM", abort);
    });
  } finally {
    console.log("Stopping server...");

    await new Promise<void>((resolve, reject) =>
      wss.close((error) => (error == null ? resolve() : reject(error))),
    );

    server.closeAllConnections();

    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error == null ? resolve() : reject(error))),
    );

    console.log("Server stopped");
  }
}
