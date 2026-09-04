import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  const bookRepositoryMock = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  const eventEmitterMock = {
    emit: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
        providers: [
    BooksService,
    {
      provide: 'BOOK_REPOSITORY',
      useValue: bookRepositoryMock,
    },
    {
      provide: EventEmitter2,
    useValue: eventEmitterMock,
    },
  ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  describe('getBooks', () => {
    it('should return all books', async () => {
      const books = [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
      ];

      bookRepositoryMock.findAll.mockResolvedValue(books);

      const result = await service.getBooks();

      expect(result).toEqual(books);
      expect(bookRepositoryMock.findAll).toHaveBeenCalled();
    });
  });

  describe('getBook', () => {
    it('should return a book when it exists', async () => {
      const book = {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
      };

      bookRepositoryMock.findById.mockResolvedValue(book);

      const result = await service.getBook(1);

      expect(result).toEqual(book);
      expect(bookRepositoryMock.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when book does not exist', async () => {
      bookRepositoryMock.findById.mockResolvedValue(null);

      await expect(service.getBook(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const dto = {
        title: 'Book 1',
        author: 'Author 1',
      };

      const createdBook = {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
      };

      bookRepositoryMock.create.mockResolvedValue(createdBook);

      const result = await service.createBook(dto);

      expect(result).toEqual(createdBook);
      expect(bookRepositoryMock.create).toHaveBeenCalledWith(dto);
      expect(eventEmitterMock.emit).toHaveBeenCalledWith(
        'book.created',
        expect.anything(),
      );
    });
  });

  describe('updateBook', () => {
    it('should update a book when it exists', async () => {
      const dto = {
        title: 'Updated Book',
      };

      const existingBook = {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
      };

      const updatedBook = {
        id: 1,
        title: 'Updated Book',
        author: 'Author 1',
      };

      bookRepositoryMock.findById.mockResolvedValue(existingBook);
      bookRepositoryMock.update.mockResolvedValue(updatedBook);

      const result = await service.updateBook(1, dto);

      expect(result).toEqual(updatedBook);
      expect(bookRepositoryMock.findById).toHaveBeenCalledWith(1);
      expect(bookRepositoryMock.update).toHaveBeenCalledWith(1, dto);
      expect(eventEmitterMock.emit).toHaveBeenCalledWith(
        'book.updated',
        expect.anything(),
      );
    });

    it('should throw NotFoundException when book does not exist', async () => {
      bookRepositoryMock.findById.mockResolvedValue(null);

      await expect(
        service.updateBook(999, {
          title: 'Updated Book',
        }),
      ).rejects.toThrow(NotFoundException);

      expect(bookRepositoryMock.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteBook', () => {
    it('should delete a book when it exists', async () => {
      const book = {
        id: 1,
        title: 'Book 1',
        author: 'Author 1',
      };

      bookRepositoryMock.findById.mockResolvedValue(book);
      bookRepositoryMock.delete.mockResolvedValue(book);

      const result = await service.deleteBook(1);

      expect(result).toEqual(book);
      expect(bookRepositoryMock.findById).toHaveBeenCalledWith(1);
      expect(bookRepositoryMock.delete).toHaveBeenCalledWith(1);
      expect(eventEmitterMock.emit).toHaveBeenCalledWith(
        'book.deleted',
        expect.anything(),
      );
    });

    it('should throw NotFoundException when book does not exist', async () => {
      bookRepositoryMock.findById.mockResolvedValue(null);

      await expect(service.deleteBook(999)).rejects.toThrow(
        NotFoundException,
      );

      expect(bookRepositoryMock.delete).not.toHaveBeenCalled();
    });
  });
});