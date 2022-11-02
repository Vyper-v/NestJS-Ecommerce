import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty({
    minimum: 0,
  })
  price: number;
  @ApiProperty()
  stock: number;
  @ApiProperty({
    minimum: 0,
    maximum: 100,
  })
  discount?: number;
}
