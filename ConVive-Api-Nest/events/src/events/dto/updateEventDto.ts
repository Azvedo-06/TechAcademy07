import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsDateString()
  date: string; // tipo string para validação via DTO, depois converte para Date no service
  @ApiProperty()
  @IsInt()
  @Min(1)
  spaceId: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @ApiProperty()
  @IsString()
  descriptionCard: string;
  @ApiProperty()
  @IsString()
  descriptionModal: string;
}
