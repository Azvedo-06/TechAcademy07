import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;
  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date: string; // tipo string para validação via DTO, depois converte para Date no service
  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1)
  spaceId: number;
  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  descriptionCard: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  descriptionModal: string;
}
