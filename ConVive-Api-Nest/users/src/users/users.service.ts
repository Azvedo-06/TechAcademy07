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
import { ValidationsUsers } from 'src/utils/validationsUsers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private validateUsers: ValidationsUsers
  ) {}

  findAll() {
    return this.repo.find();
  }

  async create(dto: CreateUserDto) {
    this.validateUsers.nameIsNull(dto.name);
    this.validateUsers.validateCpf(dto.cpf);
    this.validateUsers.validatePhone(dto.phone);
    this.validateUsers.validateEmail(dto.email);
    this.validateUsers.validatePassword(dto.password);

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
    this.validateUsers.findUser(user)
    return user;
  }

  async delete(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    this.validateUsers.findUser(user);

    return (this.repo.delete(id), { message: 'Usuário deletado com sucesso' });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    this.validateUsers.nameIsNull(dto.name);
    this.validateUsers.validatePhone(dto.phone);
    this.validateUsers.validateEmail(dto.email);
    this.validateUsers.validatePassword(dto.password);

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
    const findEmail = await this.repo.findOne({ where: { email } });
    this.validateUsers.findByEmail(findEmail)
    return findEmail
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
