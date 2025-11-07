import { Injectable, NotFoundException } from '@nestjs/common';
import { Space } from './entities/Space.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationSpaces } from 'src/utils/validationsSpaca';
import { CreateSpacesDto } from './dto/createSpacesDto';
import { updateSpaceDto } from './dto/updateSpaceDto';

@Injectable()
export class SpacesService {
    constructor(
        @InjectRepository(Space) private repo: Repository<Space>,
        private validateSpace: ValidationSpaces, 
    ) {}

    findAll() {
        return this.repo.find();
    }

    async findById(id: number) {
        const space = await this.repo.findOne({ where: { id } });
        this.validateSpace.findSpace(space)
        return space; 
    }

    async delete(id: number) {
        const space = await this.repo.findOne({ where: {id }});
        this.validateSpace.findSpace(space);
        return (this.repo.delete(id), {message: 'Espaço deletado com sucesso' });
    }

    async create(dto: CreateSpacesDto) {
        const space = this.repo.create({
            title: dto.title,
            imageUrl: dto.imageUrl
        })
        const saved = await this.repo.save(space);
        return saved
    }

    async update(id: number, dto: updateSpaceDto ) {
        const space = await this.repo.findOne({ where: { id } });

        if(!space) {
            throw new NotFoundException('Evento não encontrado');
        }

        space.title = dto.title ?? space.title
        space.imageUrl = dto.imageUrl ?? space.imageUrl

        return (await this.repo.save(space), {message: 'Espaço atualizado com sucesso' })
    }
}
