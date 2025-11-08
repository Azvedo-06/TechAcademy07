import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string; // tipo string para validação via DTO, depois converte para Date no service

  @IsInt()
  @Min(1)
  spaceId: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  descriptionCard: string;

  @IsString()
  descriptionModal: string;

  @IsInt()
  @Min(1)
  userId: number;
}
