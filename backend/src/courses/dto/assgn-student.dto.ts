import { IsString } from 'class-validator';

export class AssignStudentDto {
  @IsString()
  _id: string;
}
