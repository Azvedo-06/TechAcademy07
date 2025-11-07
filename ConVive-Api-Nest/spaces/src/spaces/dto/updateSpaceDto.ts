import { IsOptional, IsString } from 'class-validator';

export class updateSpaceDto {
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
}