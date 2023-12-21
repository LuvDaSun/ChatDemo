import grpc from "@grpc/grpc-js";
import * as common from "chat-api-common";
import { createServer } from "chat-common-grpc";
import * as yargs from "yargs";
import { createHandlers } from "../application/index.js";

export function registerServerProgram(argv: yargs.Argv) {
  return argv.command(
    "server",
    "Start chat-api-grpc server",
    (yargs) =>
      yargs.option("port", {
        description: "Port to start the server on",
        type: "number",
        default: 50051,
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

  const context = new common.application.Context();
  const handlers = createHandlers(context);

  const server = createServer(handlers);

  const listeningPort = await new Promise<number>((resolve, reject) =>
    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) =>
      error == null ? resolve(port) : reject(error),
    ),
  );
  server.start();

  // server.addListener("request", applicationServer.requestHandler);

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

    server.forceShutdown();

    console.log("Server stopped");
  }
}
