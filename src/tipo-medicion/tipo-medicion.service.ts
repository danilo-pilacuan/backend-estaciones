import { Injectable } from '@nestjs/common';
import { CreateTipoMedicionDto } from './dto/create-tipo-medicion.dto';
import { UpdateTipoMedicionDto } from './dto/update-tipo-medicion.dto';

@Injectable()
export class TipoMedicionService {
  create(createTipoMedicionDto: CreateTipoMedicionDto) {
    return 'This action adds a new tipoMedicion';
  }

  findAll() {
    return `This action returns all tipoMedicion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoMedicion`;
  }

  update(id: number, updateTipoMedicionDto: UpdateTipoMedicionDto) {
    return `This action updates a #${id} tipoMedicion`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoMedicion`;
  }
}
