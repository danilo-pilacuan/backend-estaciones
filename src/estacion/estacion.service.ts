import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstacionDto } from './dto/create-estacion.dto';
import { UpdateEstacionDto } from './dto/update-estacion.dto';
import { Estacion } from './entities/estacion.entity';

@Injectable()
export class EstacionService {
  constructor(
    @InjectRepository(Estacion)
    private readonly estacionRepository: Repository<Estacion>,
  ) {}

  async create(createEstacionDto: CreateEstacionDto): Promise<Estacion> {
    const estacion = this.estacionRepository.create(createEstacionDto);
    return await this.estacionRepository.save(estacion);
  }

  async findAll(): Promise<Estacion[]> {
    return await this.estacionRepository.find();
  }

  async findOne(id: number): Promise<Estacion> {
    const estacion = await this.estacionRepository.findOne({ where: { id } });
    if (!estacion) {
      throw new NotFoundException(`Estación con id ${id} no encontrada`);
    }
    return estacion;
  }

  async update(id: number, updateEstacionDto: UpdateEstacionDto): Promise<Estacion> {
    const estacion = await this.estacionRepository.preload({
      id,
      ...updateEstacionDto,
    });
    if (!estacion) {
      throw new NotFoundException(`Estación con id ${id} no encontrada`);
    }
    return await this.estacionRepository.save(estacion);
  }

  async remove(id: number): Promise<Estacion> {
    const estacion = await this.findOne(id);
    return await this.estacionRepository.remove(estacion);
  }
}
