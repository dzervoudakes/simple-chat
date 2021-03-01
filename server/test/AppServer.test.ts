import { Socket } from 'socket.io';
import AppServer from '@src/AppServer';
import { MessageType, Room } from '@src/models';

jest.mock('mongoose');

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

  it('handles public chat messages', async () => {
    let mockName;
    let mockRoom;
    let mockText;

    receiver = require('socket.io-client')(HOST, { query: { userId: '12345' } });
    receiver.on('receive-message-public', (message: MessageType) => {
      mockName = message.username;
      mockRoom = message.room;
      mockText = message.text;
    });

    sender = require('socket.io-client')(HOST, { query: { userId: '67890' } });
    sender.emit('send-message-public', {
      username: 'Dave',
      room: 'general',
      text: 'Chat works'
    });

    await new Promise((res) => setTimeout(res, 100));

    expect(mockName).toBe('Dave');
    expect(mockRoom).toBe('general');
    expect(mockText).toBe('Chat works');
  });

  it('handles private chat messages', async () => {
    let mockPrivateMessage;

    receiver = require('socket.io-client')(HOST, { query: { userId: '12345' } });
    receiver.on('receive-message-private', (message: MessageType) => {
      mockPrivateMessage = message.text;
    });

    sender = require('socket.io-client')(HOST, { query: { userId: '67890' } });
    sender.emit('send-message-private', {
      username: 'Dave',
      room: null,
      text: 'Private messaging works',
      recipient: '12345'
    });

    await new Promise((res) => setTimeout(res, 100));

    expect(mockPrivateMessage).toBe('Private messaging works');
  });
});