import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookRepository } from './book.repository';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany();
  }

  findById(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  create(data: CreateBookDto) {
    const { publishedAt, ...bookData } = data;

    return this.prisma.book.create({
      data: {
        ...bookData,
        publishedAt: publishedAt
          ? new Date(publishedAt)
          : undefined,
      },
    });
  }

  update(id: number, data: UpdateBookDto) {
    const { publishedAt, ...bookData } = data;

    return this.prisma.book.update({
      where: { id },
      data: {
        ...bookData,
        publishedAt: publishedAt
          ? new Date(publishedAt)
          : undefined,
      },
    });
  }

  delete(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}