import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(SocketGateway.name);
  private readonly userSockets = new Map<string, string>(); // { userId: socketId }
  private readonly userActivities = new Map<string, string>(); // { userId: activity }

  handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    let disconnectedUserId: string | undefined;

    for (const [userId, socketId] of this.userSockets.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        this.userSockets.delete(userId);
        this.userActivities.delete(userId);
        break;
      }
    }

    if (disconnectedUserId) {
      this.server.emit('user_disconnected', disconnectedUserId);
    }

    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('user_connected')
  handleUserConnected(
    @MessageBody() userId: string,
    @ConnectedSocket() socket: Socket, // <-- socket đúng cách
  ) {
    this.userSockets.set(userId, socket.id);
    this.userActivities.set(userId, 'Idle');

    this.server.emit('user_connected', userId);
    socket.emit('users_online', Array.from(this.userSockets.keys()));
    this.server.emit('activities', Array.from(this.userActivities.entries()));
  }

  @SubscribeMessage('update_activity')
  handleUpdateActivity(
    @MessageBody() payload: { userId: string; activity: string },
  ) {
    const { userId, activity } = payload;
    this.userActivities.set(userId, activity);
    this.server.emit('activity_updated', { userId, activity });
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      content: string;
    },
  ) {
    try {
      // Replace with actual DB call (e.g., via a service)
      const message = {
        id: Date.now().toString(),
        senderId: data.senderId,
        receiverId: data.receiverId,
        content: data.content,
        timestamp: new Date(),
      };

      const receiverSocketId = this.userSockets.get(data.receiverId);
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('receive_message', message);
      }

      const senderSocketId = this.userSockets.get(data.senderId);
      if (senderSocketId) {
        this.server.to(senderSocketId).emit('message_sent', message);
      }
    } catch (err) {
      const senderSocketId = this.userSockets.get(data.senderId);
      if (senderSocketId) {
        this.server.to(senderSocketId).emit('message_error', err.message);
      }
    }
  }
}
