import * as grpcWeb from "grpc-web";

import * as service_pb from "./service_pb"; // proto import: "service.proto"

export class ChatDemoClient {
  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any },
  );

  getMessages(
    request: service_pb.Nothing,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError, response: service_pb.Messages) => void,
  ): grpcWeb.ClientReadableStream<service_pb.Messages>;

  subscribeMessageEvents(
    request: service_pb.Nothing,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<service_pb.MessageEvent>;

  newMessage(
    request: service_pb.Message,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError, response: service_pb.Nothing) => void,
  ): grpcWeb.ClientReadableStream<service_pb.Nothing>;
}

export class ChatDemoPromiseClient {
  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any },
  );

  getMessages(
    request: service_pb.Nothing,
    metadata?: grpcWeb.Metadata,
  ): Promise<service_pb.Messages>;

  subscribeMessageEvents(
    request: service_pb.Nothing,
    metadata?: grpcWeb.Metadata,
  ): grpcWeb.ClientReadableStream<service_pb.MessageEvent>;

  newMessage(request: service_pb.Message, metadata?: grpcWeb.Metadata): Promise<service_pb.Nothing>;
}
