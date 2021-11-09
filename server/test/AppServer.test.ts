import { io } from 'socket.io-client';

import AppServer from '@src/AppServer';
import { MessageType, UserType } from '@src/models';

jest.mock('mongoose');

describe('AppServer', () => {
  const server = new AppServer();
  const HOST = 'http://localhost:3000';

  let receiver: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  let sender: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  beforeAll(() => {
    server.start();
  });

  afterEach(() => {
    receiver.disconnect();
    sender?.disconnect();
  });

  afterAll(() => {
    server.stop();
  });

  it('handles public chat messages', async () => {
    let mockName;
    let mockChannel;
    let mockText;

    receiver = io(HOST, { query: { userId: '12345' } });
    receiver.on('receive-message-public', (message: MessageType) => {
      mockName = message.username;
      mockChannel = message.channel;
      mockText = message.text;
    });

    sender = io(HOST, { query: { userId: '67890' } });
    sender.emit('send-message-public', {
      username: 'Dave',
      channel: 'general',
      text: 'Chat works'
    });

    await new Promise((res) => setTimeout(res, 100));

    expect(mockName).toBe('Dave');
    expect(mockChannel).toBe('general');
    expect(mockText).toBe('Chat works');
  });

  it('handles private chat messages', async () => {
    let mockPrivateMessage;

    receiver = io(HOST, { query: { userId: '12345' } });
    receiver.on('receive-message-private', (message: MessageType) => {
      mockPrivateMessage = message.text;
    });

    sender = io(HOST, { query: { userId: '67890' } });
    sender.emit('send-message-private', {
      username: 'Dave',
      channel: null,
      text: 'Private messaging works',
      recipientId: '12345'
    });

    await new Promise((res) => setTimeout(res, 100));

    expect(mockPrivateMessage).toBe('Private messaging works');
  });

  it('handles new users', async () => {
    let mockUsername;

    receiver = io(HOST, { query: { userId: '12345' } });
    receiver.on('receive-new-user', (user: UserType) => {
      mockUsername = user.username;
    });

    sender = io(HOST, { query: { userId: '67890' } });
    sender.emit('send-new-user', {
      username: 'TestUser123',
      _id: '67890'
    });

    await new Promise((res) => setTimeout(res, 100));

    expect(mockUsername).toBe('TestUser123');
  });
});
