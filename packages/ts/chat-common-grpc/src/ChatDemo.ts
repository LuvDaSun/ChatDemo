// Original file: src/service.proto

import type * as grpc from "@grpc/grpc-js";

export interface ChatDemoClient extends grpc.Client {}

export interface ChatDemoHandlers extends grpc.UntypedServiceImplementation {}

export interface ChatDemoDefinition extends grpc.ServiceDefinition {}
