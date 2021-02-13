import http from 'http';
import express from 'express';
import chalk from 'chalk';
import { Socket } from 'socket.io';

interface Message {
  room: 'general' | 'work' | 'random';
  text: string;
}

class AppServer {
  private app = express();

  private http = http.createServer(this.app);

  // apparently 'io()' doesn't work with import syntax
  private io = require('socket.io')(this.http);

  private rooms = ['general', 'work', 'random'];

  constructor() {
    this.setupApp();
    this.setupWebSockets();
  }

  private setupApp(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupWebSockets(): void {
    // new client connects
    this.io.on('connection', (socket: Socket) => {
      const { username } = socket.handshake.query;
      const welcome = `Welcome to simple chat${username ? `, ${username}` : ''}!`;

      // client joins all public rooms and a welcome message is sent
      socket.join(this.rooms);
      this.io.to(socket.id).emit('connection-success', { welcome, rooms: this.rooms });

      // sending and receiving messages
      socket.on('send-chat-message', (message: Message) => {
        socket.broadcast.to(message.room).emit('receive-chat-message', message);
      });
    });
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;

    this.http.listen(PORT, () => {
      console.log(chalk.cyan(`Server running on port ${PORT}.`));
    });
  }
}

export default AppServer;
