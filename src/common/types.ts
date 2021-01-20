export interface ChatMessage {
  fromClientId: number;
  username: string;
  message: string;
  isOwner: boolean;
}

export interface HttpMessage {
  body: ChatMessage;
}

export interface WSMsg {
  data: string;
}

export interface MyOutgoingMessage {
  chatEventType: ChatEventType;
  value?: string;
  newUsername?: string;
}

export enum ChatEventType {
  Default = 0,
  UsernameChange
}
