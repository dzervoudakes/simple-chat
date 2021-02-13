export type Rooms = 'general' | 'work' | 'random';

export interface Connection {
  welcome: string;
  rooms: Rooms[];
}

export interface Message {
  room: Rooms;
  text: string;
}
