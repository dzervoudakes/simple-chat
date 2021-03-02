import { CancelTokenSource, AxiosResponse } from 'axios';

export type Room = 'general' | 'work' | 'random';

export interface Connection {
  welcome: string;
  rooms: Room[];
}

export interface Message {
  username: string;
  userId: string;
  recipient: string | 'all';
  room: Room | null;
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

export type ApiResponse = Promise<AxiosResponse<Record<string, unknown>>>;

export interface AuthPayload {
  username: string;
  password: string;
}
