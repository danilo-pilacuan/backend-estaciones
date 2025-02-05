import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEstacionDto {
  @ApiProperty({
    description: 'Número de serie de la estación',
    example: 'NS-12345',
  })
  @IsString()
  @IsNotEmpty()
  numero_serie: string;

  @ApiProperty({
    description: 'Modelo de la estación',
    example: 'Modelo X',
  })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({
    description: 'Descripción de la estación',
    example: 'Estación meteorológica ubicada en Quito',
  })
  @IsString()
  //@IsNotEmpty()
  @IsOptional()
  descripcion: string;

  @ApiProperty({
    description: 'Latitud de la ubicación de la estación',
    example: '-0.180653',
  })
  @IsString()
  @IsNotEmpty()
  latitud: string;

  @ApiProperty({
    description: 'Longitud de la ubicación de la estación',
    example: '-78.467834',
  })
  @IsString()
  //@IsNotEmpty()
  @IsNotEmpty()
  longitud: string;

  @ApiProperty({
    description: 'Variables medidas por la estación',
    example: 'Temperatura, Humedad, Presión',
  })
  @IsString()
  @IsOptional()
  variables: string;

  @ApiProperty({
    description: 'Estado de la estación',
    example: 1,
    default: 0,
  })
  @IsInt()
  @IsOptional()
  estado?: number;

  @ApiProperty({
    description: 'Información adicional sobre la estación',
    example: 'Instalada en 2025, requiere mantenimiento anual',
  })
  @IsString()
  @IsOptional()
  informacion_adicional?: string;
}
