import { Socket } from 'socket.io';
import AppServer, { Message } from '@src/AppServer';

type Rooms = 'general' | 'work' | 'random';

interface Connection {
  welcome: string;
  rooms: Rooms[];
}

describe('AppServer', () => {
  const server = new AppServer();
  const HOST = 'http://localhost:3000';

  let socket: Socket;
  let sender: Socket;

  beforeAll(() => {
    server.start();
  });

  afterEach(() => {
    socket.disconnect();
    sender?.disconnect();
  });

  afterAll(async () => {
    server.stop();

    await new Promise((res) => setTimeout(res, 500));
  });

  it('establishes a websocket connection', async () => {
    let mockWelcome;
    let mockRooms;

    socket = require('socket.io-client')(HOST, {
      query: { username: 'test' }
    });

    socket.on('connection-success', ({ welcome, rooms }: Connection) => {
      mockWelcome = welcome;
      mockRooms = rooms;
    });

    await new Promise((res) => setTimeout(res, 500));

    expect(mockWelcome).toEqual('Welcome to simple chat, test!');
    expect(mockRooms).toEqual(['general', 'work', 'random']);
  });

  it('handles chat messages', async () => {
    let mockName;
    let mockRoom;
    let mockText;

    socket = require('socket.io-client')(HOST);
    socket.on('receive-chat-message', (message: Message) => {
      mockName = message.name;
      mockRoom = message.room;
      mockText = message.text;
    });

    sender = require('socket.io-client')(HOST);
    sender.emit('send-chat-message', {
      name: 'Dave',
      room: 'general',
      text: 'Chat works'
    });

    await new Promise((res) => setTimeout(res, 500));

    expect(mockName).toBe('Dave');
    expect(mockRoom).toBe('general');
    expect(mockText).toBe('Chat works');
  });
});
