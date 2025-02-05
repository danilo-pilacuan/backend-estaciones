import { Injectable } from '@nestjs/common';
import { CreateInformeEstacionDto } from './dto/create-informe-estacion.dto';
import { UpdateInformeEstacionDto } from './dto/update-informe-estacion.dto';

@Injectable()
export class InformeEstacionService {
  create(createInformeEstacionDto: CreateInformeEstacionDto) {
    return 'This action adds a new informeEstacion';
  }

  findAll() {
    return `This action returns all informeEstacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informeEstacion`;
  }

  update(id: number, updateInformeEstacionDto: UpdateInformeEstacionDto) {
    return `This action updates a #${id} informeEstacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} informeEstacion`;
  }
}
