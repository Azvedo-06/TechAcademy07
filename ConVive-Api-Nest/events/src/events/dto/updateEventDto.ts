import { IsDateString } from "class-validator";

export class UpdateEventDto {
  title: string;

  @IsDateString()
  date: string; // tipo string para validação via DTO, depois converte para Date no service

  location: string;

  imageUrl?: string;

  descriptionCard: string;

  descriptionModal: string;
}
