export interface ChatMessage {
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
