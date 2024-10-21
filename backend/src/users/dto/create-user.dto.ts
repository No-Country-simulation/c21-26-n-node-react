import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export enum UserRole {
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'PARENT',
}

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly role: UserRole;
}
