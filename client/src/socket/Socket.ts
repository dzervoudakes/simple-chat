/**
 * Class that enables socket connection and controls sending/receiving messages.
 * @packageDocumentation
 */
import { SERVER_BASE_URL } from '@src/constants';
import { ActiveSocket, ChatUser, Message } from '@src/types';

interface Query {
  userId: string;
}

export class Socket {
  constructor(query: Query) {
    this.socket = require('socket.io-client')(SERVER_BASE_URL, { query });
  }

  private socket;

  public subscribeToChat = (
    updateChat: (message: Message) => void,
    updateUsers: (user: ChatUser) => void,
    updateSockets: (sockets: ActiveSocket[]) => void
  ): void => {
    const messageHandler = (message: Message): void => {
      updateChat(message);
    };

    this.socket.on('receive-message-public', messageHandler);
    this.socket.on('receive-message-private', messageHandler);
    this.socket.on('receive-new-user', (user: ChatUser) => {
      updateUsers(user);
    });
    this.socket.on('update-sockets', (sockets: ActiveSocket[]) => {
      updateSockets(sockets);
    });
  };

  public sendChatMessage = (variant: 'public' | 'private', message: Message): void => {
    this.socket.emit(`send-message-${variant}`, message);
  };

  public sendNewUser = (user: ChatUser): void => {
    this.socket.emit('send-new-user', user);
  };

  public disconnect = (): void => {
    this.socket.off();
    this.socket.disconnect();
  };
}

export default Socket;
