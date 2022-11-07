import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty({
    minimum: 0,
  })
  @Min(0)
  price: number;
  @ApiProperty({
    minimum: 0,
  })
  @Min(0)
  stock: number;
  @ApiProperty({
    minimum: 0,
    maximum: 100,
  })
  @Min(0)
  @Max(100)
  discount?: number;
}
