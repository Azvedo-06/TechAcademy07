import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Event } from 'src/events/Event.model';

export class ValidationEvent {
  validationIsAdm(user: any) {
    if (user.isAdmin === false) {
      throw new ForbiddenException('Usuário não pode criar um evento');
    }
  }
  validationDateEvent(date: any) {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ignora horas

    if (eventDate < today) {
      throw new ForbiddenException('A data do evento não pode ser no passado');
    }
    return date;
  }
  validationExistEventDate(exist: Event | any) {
    if (exist) {
      throw new BadRequestException('Já existe um evento nessa data.');
    }
  }
  findEvent(event: Event | any) {
    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }
  }
  FindSpace(space: any) {
    if (!space) {
      throw new NotFoundException('Espaço não encontrado');
    }
  }
}
