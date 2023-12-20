import type * as grpc from "@grpc/grpc-js";

import type {
  ChatDemoClient as _ChatDemoClient,
  ChatDemoDefinition as _ChatDemoDefinition,
} from "./ChatDemo.js";

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ChatDemo: SubtypeConstructor<typeof grpc.Client, _ChatDemoClient> & {
    service: _ChatDemoDefinition;
  };
}
