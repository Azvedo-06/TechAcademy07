import { IsOptional, IsString } from 'class-validator';

export class CreateSpacesDto {
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  imageUrl: string;
}
