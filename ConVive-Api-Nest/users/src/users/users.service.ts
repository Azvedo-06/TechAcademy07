import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {}

  findAll() {
    return this.repo.find();
  }

  async create(dto: CreateUserDto) {
    if (!dto.name || typeof dto.name !== 'string') {
      throw new BadRequestException(
        'Nome é obrigatório e deve ter somente letras',
      );
    }

    const cpfNumeros = dto.cpf.replace(/\D/g, '');
    if (!/^\d{11}$/.test(cpfNumeros)) {
      throw new BadRequestException('CPF deve ter 11 dígitos numéricos');
    }

    if (!/^\d{10,11}$/.test(dto.phone)) {
      throw new BadRequestException('Telefone inválido');
    }

    if (!/^\S+@\S+\.\S+$/.test(dto.email)) {
      throw new BadRequestException('Email inválido');
    }

    if (!dto.password || dto.password.length < 6) {
      throw new BadRequestException('Senha deve ter no mínimo 6 caracteres');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.repo.create({
      name: dto.name,
      cpf: dto.cpf,
      phone: dto.phone,
      email: dto.email,
      password: hashedPassword,
      isAdmin: dto.isAdmin ?? false,
    });
    return this.repo.save(user);
  }

  async findById(id: number) {
    console.log('Procurando Usuário pelo id:', id);
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async delete(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return (this.repo.delete(id), { message: 'Usuário deletado com sucesso' });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!dto.name || typeof dto.name !== 'string') {
      throw new BadRequestException('Nome é obrigatório e deve ser uma string');
    }

    if (!/^\d{10,11}$/.test(dto.phone)) {
      throw new BadRequestException('Telefone inválido');
    }

    if (!/^\S+@\S+\.\S+$/.test(dto.email)) {
      throw new BadRequestException('Email inválido');
    }

    if (!dto.password || dto.password.length < 6) {
      throw new BadRequestException('Senha deve ter no mínimo 6 caracteres');
    }

    const hashedPassword = dto.password
      ? await bcrypt.hash(dto.password, 10)
      : user.password;

    user.name = dto.name ?? user.name;
    user.phone = dto.phone ?? user.phone;
    user.email = dto.email ?? user.email;
    user.password = hashedPassword;
    
    return (
      await this.repo.save(user),
      { message: 'Usuário atualizado com sucesso' }
    );
  }

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
