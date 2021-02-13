export type Room = 'general' | 'work' | 'random';

export interface Connection {
  welcome: string;
  rooms: Room[];
}

export interface Message {
  name: string;
  room: Room;
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
