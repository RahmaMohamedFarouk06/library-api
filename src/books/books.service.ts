import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';



import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(private readonly prisma: PrismaService) {}

  getBooks() {
    return this.prisma.book.findMany();
  }

  async getBook(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  createBook(createBookDto: CreateBookDto) {
  this.logger.log(`Creating book: ${createBookDto.title}`);

  const { publishedAt, ...data } = createBookDto;

  return this.prisma.book.create({
    data: {
      ...data,
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
    },
  });
}

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const { publishedAt, ...data } = updateBookDto;

    return this.prisma.book.update({
      where: { id },
      data: {
        ...data,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      },
    });
  }

  async deleteBook(id: number) {
  const book = await this.prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    this.logger.warn(`Book with ID ${id} not found`);
    throw new NotFoundException(`Book with ID ${id} not found`);
  }

  this.logger.log(`Deleting book with ID ${id}`);

  return this.prisma.book.delete({
    where: { id },
  });
}
}