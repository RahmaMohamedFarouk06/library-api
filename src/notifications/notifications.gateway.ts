
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { OnEvent } from '@nestjs/event-emitter';

import { BookCreatedEvent } from '../books/events/book-created.event';
import { BookUpdatedEvent } from '../books/events/book-updated.event';
import { BookDeletedEvent } from '../books/events/book-deleted.event';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotificationsGateway.name);

  @WebSocketServer()
  server: Server;

  @OnEvent('book.created')
  handleBookCreated(event: BookCreatedEvent) {
    this.logger.log(
      `Broadcasting book.created for book #${event.bookId}`,
    );

    this.server.emit('book.created', {
      id: event.bookId,
      title: event.title,
      author: event.author,
    });
  }

  @OnEvent('book.updated')
  handleBookUpdated(event: BookUpdatedEvent) {
    this.logger.log(
      `Broadcasting book.updated for book #${event.bookId}`,
    );

    this.server.emit('book.updated', {
      id: event.bookId,
      title: event.title,
      author: event.author,
    });
  }

  @OnEvent('book.deleted')
  handleBookDeleted(event: BookDeletedEvent) {
    this.logger.log(
      `Broadcasting book.deleted for book #${event.bookId}`,
    );

    this.server.emit('book.deleted', {
      id: event.bookId,
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  handlePing(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('pong', {
      message,
    });
  }
}

