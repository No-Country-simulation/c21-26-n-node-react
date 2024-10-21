import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetEmail {
  @IsEmail()
  readonly email: string;
}
