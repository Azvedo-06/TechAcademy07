import { Injectable, NotFoundException } from '@nestjs/common';
import { Space } from './entities/Space.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidationSpaces } from 'src/utils/validationsSpaca';
import { CreateSpacesDto } from './dto/createSpacesDto';
import { updateSpaceDto } from './dto/updateSpaceDto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space) private repo: Repository<Space>,
    private validateSpace: ValidationSpaces,
    private redis: RedisService,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findById(id: number) {
    const space = await this.repo.findOne({ where: { id } });
    this.validateSpace.findSpace(space);
    return space;
  }

  async delete(id: number) {
    const space = await this.repo.findOne({ where: { id } });
    this.validateSpace.findSpace(space);
    await this.repo.delete(id);
    return { message: 'Espaço deletado com sucesso' };
  }

  async create(dto: CreateSpacesDto) {
    const space = this.repo.create({
      title: dto.title,
      imageUrl: dto.imageUrl
    });
    const savedSpace = await this.repo.save(space);

    await this.redis
      .getPublisher()
      .publish('space_created', JSON.stringify(savedSpace));
    return savedSpace;
  }

  async update(id: number, dto: updateSpaceDto) {
    const space = await this.repo.findOne({ where: { id } });

    if (!space) {
      throw new NotFoundException('Espaço não encontrado');
    }

    space.title = dto?.title ?? space.title;
    space.imageUrl = dto?.imageUrl ?? space.imageUrl;

    await this.repo.save(space);

    return { message: 'Espaço atualizado com sucesso' };
  }
}
