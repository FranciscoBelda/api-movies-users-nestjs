import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6)
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
