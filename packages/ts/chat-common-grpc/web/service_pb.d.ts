import * as jspb from 'google-protobuf'



export class Message extends jspb.Message {
  getValue(): string;
  setValue(value: string): Message;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    value: string,
  }
}

export class Messages extends jspb.Message {
  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): Messages;
  clearValuesList(): Messages;
  addValues(value: string, index?: number): Messages;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Messages.AsObject;
  static toObject(includeInstance: boolean, msg: Messages): Messages.AsObject;
  static serializeBinaryToWriter(message: Messages, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Messages;
  static deserializeBinaryFromReader(message: Messages, reader: jspb.BinaryReader): Messages;
}

export namespace Messages {
  export type AsObject = {
    valuesList: Array<string>,
  }
}

export class MessageEvent extends jspb.Message {
  getSnapshot(): MessageSnapshot | undefined;
  setSnapshot(value?: MessageSnapshot): MessageEvent;
  hasSnapshot(): boolean;
  clearSnapshot(): MessageEvent;

  getNew(): MessageNew | undefined;
  setNew(value?: MessageNew): MessageEvent;
  hasNew(): boolean;
  clearNew(): MessageEvent;

  getTypeCase(): MessageEvent.TypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MessageEvent): MessageEvent.AsObject;
  static serializeBinaryToWriter(message: MessageEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageEvent;
  static deserializeBinaryFromReader(message: MessageEvent, reader: jspb.BinaryReader): MessageEvent;
}

export namespace MessageEvent {
  export type AsObject = {
    snapshot?: MessageSnapshot.AsObject,
    pb_new?: MessageNew.AsObject,
  }

  export enum TypeCase { 
    TYPE_NOT_SET = 0,
    SNAPSHOT = 1,
    NEW = 2,
  }
}

export class MessageSnapshot extends jspb.Message {
  getMessagesList(): Array<string>;
  setMessagesList(value: Array<string>): MessageSnapshot;
  clearMessagesList(): MessageSnapshot;
  addMessages(value: string, index?: number): MessageSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: MessageSnapshot): MessageSnapshot.AsObject;
  static serializeBinaryToWriter(message: MessageSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageSnapshot;
  static deserializeBinaryFromReader(message: MessageSnapshot, reader: jspb.BinaryReader): MessageSnapshot;
}

export namespace MessageSnapshot {
  export type AsObject = {
    messagesList: Array<string>,
  }
}

export class MessageNew extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): MessageNew;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageNew.AsObject;
  static toObject(includeInstance: boolean, msg: MessageNew): MessageNew.AsObject;
  static serializeBinaryToWriter(message: MessageNew, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageNew;
  static deserializeBinaryFromReader(message: MessageNew, reader: jspb.BinaryReader): MessageNew;
}

export namespace MessageNew {
  export type AsObject = {
    message: string,
  }
}

export class Nothing extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Nothing.AsObject;
  static toObject(includeInstance: boolean, msg: Nothing): Nothing.AsObject;
  static serializeBinaryToWriter(message: Nothing, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Nothing;
  static deserializeBinaryFromReader(message: Nothing, reader: jspb.BinaryReader): Nothing;
}

export namespace Nothing {
  export type AsObject = {
  }
}

