import * as common from "chat-api-common";
import http from "http";
import * as yargs from "yargs";
import * as application from "../application/index.js";

export function registerServerProgram(argv: yargs.Argv) {
  return argv.command(
    "server",
    "Start chat-api-gql server",
    (yargs) =>
      yargs.option("port", {
        description: "Port to start the server on",
        type: "number",
        default: 4000,
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

  const server = http.createServer();
  const applicationServer = new application.Server(context);

  await new Promise<void>((resolve, reject) => server.listen(port, () => resolve()));

  server.addListener("request", applicationServer.requestHandler);

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

    server.removeListener("request", applicationServer.requestHandler);

    server.closeAllConnections();

    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error == null ? resolve() : reject(error))),
    );

    console.log("Server stopped");
  }
}
