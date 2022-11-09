import { MinLength } from 'class-validator';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsDateString()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
