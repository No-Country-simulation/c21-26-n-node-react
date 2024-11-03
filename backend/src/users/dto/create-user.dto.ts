import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum UserRole {
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
}

export class CreateUserDto {
  @MaxLength(20)
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsEmail()
  readonly email: string;

  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly role: UserRole;
}
