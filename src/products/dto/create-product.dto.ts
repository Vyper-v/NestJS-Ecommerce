import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the product',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the product',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category of the product',
  })
  category: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the product',
    minimum: 0,
  })
  price: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The stock of the product',
    minimum: 0,
  })
  stock: number;

  @Max(100)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The discount of the product',
    minimum: 0,
    maximum: 100,
    default: 0,
  })
  discount?: number = 0;
}
