import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Space } from '../spaces/entities/Space.model';

export class ValidationSpaces {
    findSpace(space: Space | any) {
        if (!space) {
            throw new NotFoundException('Espaço não encontrado')
        }
    }
}