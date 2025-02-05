import { PartialType } from '@nestjs/swagger';
import { CreateEstacionDto } from './create-estacion.dto';

export class UpdateEstacionDto extends PartialType(CreateEstacionDto) {}
