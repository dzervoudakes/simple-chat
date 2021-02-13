export type Rooms = 'general' | 'work' | 'random';

export interface Connection {
  welcome: string;
  rooms: Rooms[];
}

export interface Message {
  room: Rooms;
  text: string;
}

export interface Theme {
  color: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  border: Record<string, string>;
  typography: Record<string, Record<string, unknown>>;
}
