import http from 'http';
import express from 'express';
import chalk from 'chalk';
import { Socket } from 'socket.io';

interface Message {
  room: string;
  text: string;
}

class AppServer {
  private app = express();

  private http = http.createServer(this.app);

  private io = require('socket.io')(this.http);

  constructor() {
    this.setupApp();
    this.setupWebSockets();
  }

  private setupApp(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupWebSockets(): void {
    this.io.on('connection', (socket: Socket) => {
      socket.on('chat-message', ({ room, text }: Message) => {
        socket.broadcast.to(room).emit('chat-message', text); // @todo this ain't gonna work
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
