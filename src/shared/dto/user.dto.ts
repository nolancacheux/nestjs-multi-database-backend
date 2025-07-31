import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
