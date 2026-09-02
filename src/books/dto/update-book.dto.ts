import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiPropertyOptional({
    example: 'Clean Code - Updated',
    description: 'The updated title of the book',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    example: 'Robert C. Martin',
    description: 'The updated author of the book',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @ApiPropertyOptional({
    example: 'Updated description',
    description: 'The updated description of the book',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '2008-08-01',
    description: 'The updated publication date',
  })
  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}