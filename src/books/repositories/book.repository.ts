import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { BookModel } from '../../generated/prisma/models/Book';

export interface BookRepository {
  findAll(): Promise<BookModel[]>;
  findById(id: number): Promise<BookModel | null>;
  create(data: CreateBookDto): Promise<BookModel>;
  update(id: number, data: UpdateBookDto): Promise<BookModel>;
  delete(id: number): Promise<BookModel>;
}