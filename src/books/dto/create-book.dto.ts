import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'Clean Code',
    description: 'The title of the book',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Robert C. Martin',
    description: 'The author of the book',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional({
    example: 'A book about writing clean and maintainable code',
    description: 'Optional description of the book',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '2008-08-01',
    description: 'Publication date of the book',
  })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}