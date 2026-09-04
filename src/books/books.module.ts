import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

import { BookCreatedListener } from './events/book-created.listener';
import { BookUpdatedListener } from './events/book-updated.listener';
import { BookDeletedListener } from './events/book-deleted.listener';

import { PrismaBookRepository } from './repositories/prisma-book.repository';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BooksController],
  providers: [
    BooksService,
    BookCreatedListener,
    BookUpdatedListener,
    BookDeletedListener,
    {
      provide: 'BOOK_REPOSITORY',
      useClass: PrismaBookRepository,
    },
  ],
})
export class BooksModule {}