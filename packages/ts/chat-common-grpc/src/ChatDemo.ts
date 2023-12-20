// Original file: src/service.proto

import type * as grpc from "@grpc/grpc-js";
import type { MethodDefinition } from "@grpc/proto-loader";
import type { Message as _Message, Message__Output as _Message__Output } from "./Message.js";
import type {
  MessageEvent as _MessageEvent,
  MessageEvent__Output as _MessageEvent__Output,
} from "./MessageEvent.js";
import type { Nothing as _Nothing, Nothing__Output as _Nothing__Output } from "./Nothing.js";

export interface ChatDemoClient extends grpc.Client {
  GetMessages(
    argument: _Nothing,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;
  GetMessages(
    argument: _Nothing,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;
  GetMessages(
    argument: _Nothing,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;
  GetMessages(
    argument: _Nothing,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _Nothing,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _Nothing,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _Nothing,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;
  getMessages(
    argument: _Nothing,
    callback: grpc.requestCallback<_Message__Output>,
  ): grpc.ClientUnaryCall;

  NewMessage(
    argument: _Message,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;
  NewMessage(
    argument: _Message,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;
  NewMessage(
    argument: _Message,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;
  NewMessage(
    argument: _Message,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;
  newMessage(
    argument: _Message,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;
  newMessage(
    argument: _Message,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;
  newMessage(
    argument: _Message,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;
  newMessage(
    argument: _Message,
    callback: grpc.requestCallback<_Nothing__Output>,
  ): grpc.ClientUnaryCall;

  SubscribeMessageEvents(
    argument: _Nothing,
    metadata: grpc.Metadata,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_MessageEvent__Output>;
  SubscribeMessageEvents(
    argument: _Nothing,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_MessageEvent__Output>;
  subscribeMessageEvents(
    argument: _Nothing,
    metadata: grpc.Metadata,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_MessageEvent__Output>;
  subscribeMessageEvents(
    argument: _Nothing,
    options?: grpc.CallOptions,
  ): grpc.ClientReadableStream<_MessageEvent__Output>;
}

export interface ChatDemoHandlers extends grpc.UntypedServiceImplementation {
  GetMessages: grpc.handleUnaryCall<_Nothing__Output, _Message>;

  NewMessage: grpc.handleUnaryCall<_Message__Output, _Nothing>;

  SubscribeMessageEvents: grpc.handleServerStreamingCall<_Nothing__Output, _MessageEvent>;
}

export interface ChatDemoDefinition extends grpc.ServiceDefinition {
  GetMessages: MethodDefinition<_Nothing, _Message, _Nothing__Output, _Message__Output>;
  NewMessage: MethodDefinition<_Message, _Nothing, _Message__Output, _Nothing__Output>;
  SubscribeMessageEvents: MethodDefinition<
    _Nothing,
    _MessageEvent,
    _Nothing__Output,
    _MessageEvent__Output
  >;
}
