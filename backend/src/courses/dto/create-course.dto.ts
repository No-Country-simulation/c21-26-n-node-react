import { IsArray, IsNumber, IsString } from 'class-validator';

export enum Level {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}
export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  images: string[];

  @IsString()
  readonly level: Level;

  @IsNumber()
  duration: number;

  @IsArray()
  @IsString({ each: true })
  modules: string[];

  @IsString()
  prerequisites: string;

  @IsArray()
  @IsString({ each: true })
  additionalResources: string[];

  @IsNumber()
  passingScore: number;

  @IsString()
  readonly status: string;

  @IsString()
  startDate: string;
}
