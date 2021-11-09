import http from 'http';

import { Server } from '@overnightjs/core';
import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { Server as IoServer, Socket } from 'socket.io';

import {
  AuthController,
  ChannelController,
  ChatOrchestrationController,
  MessageController,
  UserController
} from './controllers';
import { MessageType, UserType } from './models';

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

  private io = new IoServer(this.http, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || '',
      methods: ['GET', 'POST']
    }
  });

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
    const channelController = new ChannelController();
    const chatOrchestrationController = new ChatOrchestrationController();
    const messageController = new MessageController();
    const userController = new UserController();

    super.addControllers([
      authController,
      channelController,
      chatOrchestrationController,
      messageController,
      userController
    ]);
  }

  private setupWebSockets(): void {
    // new client connects
    this.io.on('connection', (socket: Socket) => {
      const { userId } = socket.handshake.query;

      this.sockets.push({ userId: userId as string, socketId: socket.id });
      this.io.sockets.emit('update-sockets', this.sockets);

      // send and receive public messages
      socket.on('send-message-public', (message: MessageType) => {
        socket.broadcast.emit('receive-message-public', message);
      });

      // send and receive private messages
      socket.on('send-message-private', (message: MessageType) => {
        const recipient = this.sockets.find(
          (item) => item.userId === message.recipientId
        )?.socketId;

        if (recipient) {
          socket.broadcast.to(recipient).emit('receive-message-private', message);
        }
      });

      // inform sockets when a new user creates their account
      socket.on('send-new-user', (user: UserType) => {
        socket.broadcast.emit('receive-new-user', user);
      });

      // cleanup
      socket.on('disconnect', () => {
        socket.removeAllListeners();
        const closedSocket = this.sockets.find((item) => item.socketId === socket.id);

        if (closedSocket) {
          const index = this.sockets.indexOf(closedSocket);
          this.sockets.splice(index, 1);
          this.io.sockets.emit('update-sockets', this.sockets);
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
