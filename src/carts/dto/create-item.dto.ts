import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateItemDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
