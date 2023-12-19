import * as services from "../services/index.js";

export class Context {
  messageService = new services.MessageService();
}
