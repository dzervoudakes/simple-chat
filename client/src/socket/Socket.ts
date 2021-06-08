/**
 * Class that enables socket connection and controls sending/receiving messages.
 * @packageDocumentation
 */
import { SERVER_BASE_URL } from '@src/constants';
import { Message } from '@src/context';

interface Query {
  username: string;
  userId: string;
}

export class Socket {
  constructor(query: Query) {
    this.socket = require('socket.io-client')(SERVER_BASE_URL, { query });
  }

  private socket;

  public subscribeToChat(cb: (message: Omit<Message, '_id'>) => void): void {
    const messageHandler = (message: Omit<Message, '_id'>): void => {
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
