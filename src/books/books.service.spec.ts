import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksService', () => {
  let service: BooksService;

  const prismaMock = {
    book: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  describe('getBooks', () => {
    it('should return all books', async () => {
      const books = [
        {
          id: 1,
          title: 'Clean Code',
          author: 'Robert C. Martin',
        },
        {
          id: 2,
          title: 'The Pragmatic Programmer',
          author: 'Andrew Hunt',
        },
      ];

      prismaMock.book.findMany.mockResolvedValue(books);

      const result = await service.getBooks();

      expect(result).toEqual(books);
      expect(prismaMock.book.findMany).toHaveBeenCalled();
    });
  });

  describe('getBook', () => {
    it('should return a book when it exists', async () => {
      const book = {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
      };

      prismaMock.book.findUnique.mockResolvedValue(book);

      const result = await service.getBook(1);

      expect(result).toEqual(book);

      expect(prismaMock.book.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when book does not exist', async () => {
      prismaMock.book.findUnique.mockResolvedValue(null);

      await expect(service.getBook(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const dto = {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        description: 'A book about clean code',
        publishedAt: '2008-08-01',
      };

      const createdBook = {
        id: 1,
        title: dto.title,
        author: dto.author,
        description: dto.description,
        publishedAt: new Date('2008-08-01'),
      };

      prismaMock.book.create.mockResolvedValue(createdBook);

      const result = await service.createBook(dto);

      expect(result).toEqual(createdBook);

      expect(prismaMock.book.create).toHaveBeenCalledWith({
        data: {
          title: 'Clean Code',
          author: 'Robert C. Martin',
          description: 'A book about clean code',
          publishedAt: new Date('2008-08-01'),
        },
      });
    });
  });

  describe('updateBook', () => {
    it('should update a book when it exists', async () => {
      const existingBook = {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
      };

      const dto = {
        title: 'Clean Code - Updated',
      };

      const updatedBook = {
        ...existingBook,
        title: 'Clean Code - Updated',
      };

      prismaMock.book.findUnique.mockResolvedValue(existingBook);
      prismaMock.book.update.mockResolvedValue(updatedBook);

      const result = await service.updateBook(1, dto);

      expect(result).toEqual(updatedBook);

      expect(prismaMock.book.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: 'Clean Code - Updated',
          publishedAt: undefined,
        },
      });
    });

    it('should throw NotFoundException when book does not exist', async () => {
      prismaMock.book.findUnique.mockResolvedValue(null);

      await expect(
        service.updateBook(999, { title: 'Updated' }),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.book.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteBook', () => {
    it('should delete a book when it exists', async () => {
      const book = {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
      };

      prismaMock.book.findUnique.mockResolvedValue(book);
      prismaMock.book.delete.mockResolvedValue(book);

      const result = await service.deleteBook(1);

      expect(result).toEqual(book);

      expect(prismaMock.book.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException when book does not exist', async () => {
      prismaMock.book.findUnique.mockResolvedValue(null);

      await expect(
        service.deleteBook(999),
      ).rejects.toThrow(NotFoundException);

      expect(prismaMock.book.delete).not.toHaveBeenCalled();
    });
  });
});