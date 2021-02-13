/**
 * Class that enables socket connection and controls sending and receiving messages.
 * @packageDocumentation
 */
import { Connection, Message } from '@src/types';

// @todo unit testing
// @todo .env handling/documentation (for server endpoint, etc.)
// @todo store 'socket' in ChatContext to then be accessed throughout the app where needed

export class Socket {
  private io = require('socket.io-client');

  private socket = this.io('http://localhost:3000', { query: { username: '@todo' } });

  constructor() {
    this.handleConnection();
  }

  private handleConnection(): void {
    this.socket.on('connection-success', (resp: Connection): void => {
      // @todo
      console.log('handle something here', resp);
    });
  }

  public subscribeToChat(cb: (message: Message) => void): void {
    this.socket.on('receive-chat-message', (message: Message): void => {
      cb(message);
    });
  }

  public sendChatMessage = (message: Message): void => {
    this.socket.emit('send-chat-message', message);
  };
}

export default Socket;
