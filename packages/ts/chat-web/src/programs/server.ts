import http from "http";
import * as yargs from "yargs";

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

  const server = http.createServer();

  console.log("Starting server...");

  await new Promise<void>((resolve, reject) => server.listen(port, () => resolve()));

  console.log("Server started");

  await new Promise<void>((resolve) => {
    const abort = () => {
      process.removeListener("SIGINT", abort);
      process.removeListener("SIGTERM", abort);

      resolve();
    };
    process.addListener("SIGINT", abort);
    process.addListener("SIGTERM", abort);
  });

  console.log("Stopping server...");

  server.closeAllConnections();

  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error == null ? resolve() : reject(error))),
  );

  console.log("Server stopped");
}
