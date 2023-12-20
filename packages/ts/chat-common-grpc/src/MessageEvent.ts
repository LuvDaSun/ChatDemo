// Original file: src/service.proto

import type {
  MessageNew as _MessageNew,
  MessageNew__Output as _MessageNew__Output,
} from "./MessageNew.js";
import type {
  MessageSnapshot as _MessageSnapshot,
  MessageSnapshot__Output as _MessageSnapshot__Output,
} from "./MessageSnapshot.js";

export interface MessageEvent {
  snapshot?: _MessageSnapshot | null;
  new?: _MessageNew | null;
  type?: "snapshot" | "new";
}

export interface MessageEvent__Output {
  snapshot?: _MessageSnapshot__Output | null;
  new?: _MessageNew__Output | null;
  type: "snapshot" | "new";
}
