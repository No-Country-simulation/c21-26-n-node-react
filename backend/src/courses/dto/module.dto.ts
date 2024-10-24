import { IsString, IsArray } from 'class-validator';

export class ModuleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  content: string[];
}
