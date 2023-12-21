import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import * as types from "./types/index.js";
import { projectRoot } from "./utils/index.js";

export function createServer(handlers: types.ChatDemoHandlers) {
  const server = new grpc.Server();

  const packageDefinition = protoLoader.loadSync(path.join(projectRoot, "src", "service.proto"), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

  server.addService((protoDescriptor.ChatDemo as any).service, handlers);

  return server;
}
