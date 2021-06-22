/**
 * Common type definitions used throughout the application.
 * @packageDocumentation
 */
import { CancelTokenSource, AxiosResponse } from 'axios';

export interface ApiRequest<T> {
  data?: T;
  source: CancelTokenSource;
  jwt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Promise<AxiosResponse<Record<string, any>>>;

export interface AuthPayload {
  username: string;
  password: string;
}

export interface AuthUser {
  username: string;
  id: string;
  jwt: string;
}

export interface Chat {
  [key: string]: Message[];
}

export interface Channel {
  name: string;
  _id: string;
}

export interface ChatUser {
  username: string;
  _id: string;
}

export interface Message {
  username: string;
  senderId: string;
  recipientId: string | null;
  channel: string | null;
  text: string;
  _id: string;
  createdAt: string;
}

export interface RouteParams {
  chatId: string;
  chatType: string;
}
