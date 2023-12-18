export interface State {
  messages: string[];
}

export function createState(): State {
  return { messages: [] };
}
