import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from '@overnightjs/core';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { Socket } from 'socket.io';
import { AuthController, MessageController, UserController } from './controllers';
import { MessageType } from './models';

export class AppServer extends Server {
  constructor() {
    super();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: process.env.CLIENT_ORIGIN || ''
      })
    );

    this.setupDatabaseConnection();
    this.setupControllers();
    this.setupWebSockets();
  }

  private http = http.createServer(this.app);

  // apparently 'io()' doesn't work with import syntax
  private io = require('socket.io')(this.http);

  private channels = ['general', 'work', 'random'];

  private sockets: { userId: string; socketId: string }[] = [];

  private async setupDatabaseConnection(): Promise<void> {
    await mongoose.connect(process.env.DB_CONNECTION_STRING || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(chalk.cyan('Database connection successful.'));
  }

  private setupControllers(): void {
    const authController = new AuthController();
    const messageController = new MessageController();
    const userController = new UserController();

    super.addControllers([authController, messageController, userController]);
  }

  private setupWebSockets(): void {
    // new client connects
    this.io.on('connection', (socket: Socket) => {
      const { username, userId } = socket.handshake.query;
      const welcome = `Welcome to simple chat${username ? `, ${username}` : ''}!`;

      this.sockets.push({ userId: userId as string, socketId: socket.id });

      // client joins all public channels and a welcome message is sent
      socket.join(this.channels);
      this.io
        .to(socket.id)
        .emit('connection-success', { welcome, channels: this.channels });

      // send and receive public messages
      socket.on('send-message-public', (message: MessageType) => {
        socket.broadcast
          .to(message.channel ?? '')
          .emit('receive-message-public', message);
      });

      // send and receive private messages
      socket.on('send-message-private', (message: MessageType) => {
        const recipient = this.sockets.find((item) => item.userId === message.recipient)
          ?.socketId;

        if (recipient) {
          socket.broadcast.to(recipient).emit('receive-message-private', message);
        }
      });

      // cleanup
      socket.on('disconnect', () => {
        socket.removeAllListeners();

        const closedSocket = this.sockets.find((item) => item.socketId === socket.id);
        if (closedSocket) {
          const index = this.sockets.indexOf(closedSocket);
          this.sockets.splice(index, 1);
        }
      });
    });
  }

  public start(): void {
    const PORT = process.env.PORT || 3000;

    this.http.listen(PORT, () => {
      console.log(chalk.cyan(`Server running on port ${PORT}.`));
    });
  }

  public stop(): void {
    this.http.close();
  }
}

export default AppServer;
