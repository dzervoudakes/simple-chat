/**
 * Class that enables socket connection and controls sending/receiving messages.
 * @packageDocumentation
 */
import { API_BASE_URL } from '@src/constants';
import { Message } from '@src/types';

// @todo unit testing

interface Query {
  username: string;
  userId: string;
}

interface Connection {
  welcome: string;
}

export class Socket {
  constructor(query: Query) {
    this.socket = require('socket.io-client')(API_BASE_URL, { query });

    this.handleConnection();
  }

  private socket;

  private handleConnection(): void {
    this.socket.on('connection-success', (resp: Connection): void => {
      // @todo something with the welcome message
      console.log('handle something here', resp.welcome);
    });
  }

  public subscribeToChat(cb: (message: Message) => void): void {
    const messageHandler = (message: Message): void => {
      cb(message);
    };

    this.socket.on('receive-message-public', messageHandler);
    this.socket.on('receive-message-private', messageHandler);

    // @todo 'new-user' event type here after implementing in the API
  }

  public sendChatMessage = (
    variant: 'public' | 'private',
    message: Omit<Message, '_id'>
  ): void => {
    this.socket.emit(`send-message-${variant}`, message);
  };

  public disconnect = (): void => {
    this.socket.off();
  };
}

export default Socket;
