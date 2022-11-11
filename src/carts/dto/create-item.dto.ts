import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDTO {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
