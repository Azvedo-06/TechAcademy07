import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateSpaceDto {
  @ApiProperty()
  @IsString()
  @IsOptional() 
  title: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl: string;
}