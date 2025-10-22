import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    findAll() {
        return this.repo.find();
    }

    create(name: string, cpf: string, phone: string, email: string, password: string, isAdmin = false) {
        const user = this.repo.create({ name, cpf, phone, email, password, isAdmin });
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
}
