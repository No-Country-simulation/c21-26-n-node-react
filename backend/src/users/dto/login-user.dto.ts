import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
