import { IsBoolean, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString({ message: 'CPF deve ser uma string' })
  cpf: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
  
  @IsBoolean()
  isAdmin: boolean;
}
