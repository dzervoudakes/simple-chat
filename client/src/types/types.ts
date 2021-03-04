import { CancelTokenSource, AxiosResponse } from 'axios';

// if a message is sent to a public channel, the channel property will be populated and recipientId will be null
// if a message is private between two users, the recipientId will be populated and the channel will be null
export interface Message {
  username: string;
  senderId: string;
  recipientId: string | null;
  channel: string | null;
  text: string;
}

export type Spacing = 'tiny' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

export interface Theme {
  color: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<Spacing, string>;
  border: Record<string, string>;
  typography: Record<string, Record<string, string | number>>;
}

export interface ApiRequest<T> {
  data?: T;
  source: CancelTokenSource;
  jwt: string;
}

// @todo remove explicit 'any' here somehow

export type ApiResponse = Promise<AxiosResponse<Record<string, any>>>;

export interface AuthPayload {
  username: string;
  password: string;
}
