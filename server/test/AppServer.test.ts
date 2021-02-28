import { Socket } from 'socket.io';
import AppServer from '@src/AppServer';
import { MessageType, Room } from '@src/models';

interface Connection {
  welcome: string;
  rooms: Room[];
}

describe('AppServer', () => {
  const server = new AppServer();
  const HOST = 'http://localhost:3000';

  let receiver: Socket;
  let sender: Socket;

  beforeAll(() => {
    server.start();
  });

  afterEach(() => {
    receiver.disconnect();
    sender?.disconnect();
  });

  afterAll(async () => {
    await new Promise(() => server.stop());
  });

  it('establishes a websocket connection', async () => {
    let mockWelcome;
    let mockRooms;

    receiver = require('socket.io-client')(HOST, {
      query: { username: 'test' }
    });

    receiver.on('connection-success', ({ welcome, rooms }: Connection) => {
      mockWelcome = welcome;
      mockRooms = rooms;
    });

    await new Promise((res) => setTimeout(res, 100));

    expect(mockWelcome).toEqual('Welcome to simple chat, test!');
    expect(mockRooms).toEqual(['general', 'work', 'random']);
  });

  it('handles chat messages', async () => {
    let mockName;
    let mockRoom;
    let mockText;

    receiver = require('socket.io-client')(HOST);
    receiver.on('receive-chat-message', (message: MessageType) => {
      mockName = message.username;
      mockRoom = message.room;
      mockText = message.text;
    });

    sender = require('socket.io-client')(HOST);
    sender.emit('send-chat-message', {
      name: 'Dave',
      room: 'general',
      text: 'Chat works'
    });

    await new Promise((res) => setTimeout(res, 100));

    expect(mockName).toBe('Dave');
    expect(mockRoom).toBe('general');
    expect(mockText).toBe('Chat works');
  });
});
