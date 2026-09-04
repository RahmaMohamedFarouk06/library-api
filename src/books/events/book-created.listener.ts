import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BookCreatedEvent } from './book-created.event';

@Injectable()
export class BookCreatedListener {
  private readonly logger = new Logger(BookCreatedListener.name);

  @OnEvent('book.created')
  handleBookCreatedEvent(event: BookCreatedEvent) {
    this.logger.log(
      `Book created: #${event.bookId} - ${event.title} by ${event.author}`,
    );
  }
}