import { PartialType } from '@nestjs/swagger';
import { CreateInformeEstacionDto } from './create-informe-estacion.dto';

export class UpdateInformeEstacionDto extends PartialType(CreateInformeEstacionDto) {}
