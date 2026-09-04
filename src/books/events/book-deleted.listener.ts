import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { BookDeletedEvent } from './book-deleted.event';

@Injectable()
export class BookDeletedListener {
  private readonly logger = new Logger(BookDeletedListener.name);

  @OnEvent('book.deleted')
  handleBookDeleted(event: BookDeletedEvent) {
    this.logger.log(`Book deleted: #${event.bookId}`);
  }
}