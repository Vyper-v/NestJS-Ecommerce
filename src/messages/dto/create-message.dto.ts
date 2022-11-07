import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
