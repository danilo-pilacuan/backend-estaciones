import { PartialType } from '@nestjs/swagger';
import { CreateTipoMedicionDto } from './create-tipo-medicion.dto';

export class UpdateTipoMedicionDto extends PartialType(CreateTipoMedicionDto) {}
