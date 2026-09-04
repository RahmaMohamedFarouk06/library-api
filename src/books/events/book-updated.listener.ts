import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BookUpdatedEvent } from './book-updated.event';

@Injectable()
export class BookUpdatedListener {
  private readonly logger = new Logger(BookUpdatedListener.name);

  @OnEvent('book.updated')
  handleBookUpdated(event: BookUpdatedEvent) {
    this.logger.log(
      `Book updated: #${event.bookId} - ${event.title} by ${event.author}`,
    );
  }
}