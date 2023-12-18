import http from "http";
import * as yargs from "yargs";
import * as application from "../application/index.js";

export function registerServerProgram(argv: yargs.Argv) {
  return argv.command(
    "server",
    "Start chat-web server",
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

  const server = http.createServer();
  const applicationServer = new application.Server();

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
