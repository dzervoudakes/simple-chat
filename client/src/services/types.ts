/**
 * Common type definitions for API services.
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
