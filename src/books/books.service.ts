import {
  Injectable,
  NotFoundException,
  Logger,
  Inject,
} from '@nestjs/common';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { EventEmitter2 } from '@nestjs/event-emitter';

import { BookCreatedEvent } from './events/book-created.event';
import { BookUpdatedEvent } from './events/book-updated.event';
import { BookDeletedEvent } from './events/book-deleted.event';

import type { BookRepository } from './repositories/book.repository';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @Inject('BOOK_REPOSITORY')
    private readonly bookRepository: BookRepository,
    @Inject(EventEmitter2)
    private readonly eventEmitter: EventEmitter2,
  ) {}

  getBooks() {
    return this.bookRepository.findAll();
  }

  async getBook(id: number) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async createBook(createBookDto: CreateBookDto) {
    this.logger.log(`Creating book: ${createBookDto.title}`);

    const book = await this.bookRepository.create(createBookDto);

    this.eventEmitter.emit(
      'book.created',
      new BookCreatedEvent(
        book.id,
        book.title,
        book.author,
      ),
    );

    this.logger.log(`Book created with id ${book.id}`);

    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const updatedBook = await this.bookRepository.update(
      id,
      updateBookDto,
    );

    this.eventEmitter.emit(
      'book.updated',
      new BookUpdatedEvent(
        updatedBook.id,
        updatedBook.title,
        updatedBook.author,
      ),
    );

    this.logger.log(`Book updated with id ${updatedBook.id}`);

    return updatedBook;
  }

  async deleteBook(id: number) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      this.logger.warn(`Book with ID ${id} not found`);
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.logger.log(`Deleting book with ID ${id}`);

    const deletedBook = await this.bookRepository.delete(id);

    this.eventEmitter.emit(
      'book.deleted',
      new BookDeletedEvent(deletedBook.id),
    );

    this.logger.log(`Book deleted with id ${deletedBook.id}`);

    return deletedBook;
  }
}