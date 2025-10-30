import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  cpf: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
  
  @IsOptional()
  @IsBoolean()
  isAdmin: boolean = false;
}
