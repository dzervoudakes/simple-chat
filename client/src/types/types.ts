export type Rooms = 'general' | 'work' | 'random';

export interface Message {
  room: Rooms;
  text: string;
}
