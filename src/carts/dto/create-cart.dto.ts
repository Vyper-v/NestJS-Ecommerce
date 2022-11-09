import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateItemDTO } from './create-item.dto';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDTO)
  products: CreateItemDTO[];

  @IsString()
  @IsNotEmpty()
  address: string;
}
