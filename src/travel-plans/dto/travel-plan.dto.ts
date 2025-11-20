/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  MaxLength,
  IsNotEmpty,
  IsString,
  Length,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class TravelPlanDto {
  @IsNotEmpty({ message: 'Código de país vacío' })
  @IsString()
  @Length(3, 3, {
    message: 'Código de país debe tener exactamente 3 caracteres',
  })
  countryCode: string;

  @IsNotEmpty({ message: 'Título del plan vacío' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Fecha de inicio vacía' })
  @IsDateString({}, { message: 'Fecha de inicio debe ser una fecha válida' })
  startDate: string;

  @IsNotEmpty({ message: 'Fecha de fin vacía' })
  @IsDateString({}, { message: 'Fecha de fin debe ser una fecha válida' })
  endDate: string;

  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'Notas superan los 500 caracteres)' })
  notes?: string;
}
