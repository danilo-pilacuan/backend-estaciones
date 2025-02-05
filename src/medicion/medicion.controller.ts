import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MedicionService } from './medicion.service';
import { CreateMedicionDto } from './dto/create-medicion.dto';
import { UpdateMedicionDto } from './dto/update-medicion.dto';
import { ChirpStackPayloadDto } from 'src/medicion/dto/ChirpStackPayloadDto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('medicion')
export class MedicionController {
  constructor(private readonly medicionService: MedicionService) {}

  @Post()
  create(@Body() createMedicionDto: CreateMedicionDto) {
    return this.medicionService.create(createMedicionDto);
  }

  @Get()
  findAll() {
    return this.medicionService.findAll();
  }

  @Get('getbyestacion/:estacionId')
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
findByEstacionId(
  @Param('estacionId') estacionId: number,
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10
) {
  return this.medicionService.findByEstacionId(estacionId, page, limit);
}

@Get('getbyestacionytipo/:numeroserie')
@ApiQuery({ name: 'tipo', required: false, type: Number, example: 1 })
@ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
@ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
findByEstacionIdTipo(
@Param('numeroserie') numero_serie: string,
@Query('tipo') tipo: number = 1,
@Query('page') page: number = 1,
@Query('limit') limit: number = 10
) {
return this.medicionService.findByEstacionNumeroSerie(numero_serie,tipo, page, limit);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicionDto: UpdateMedicionDto) {
    return this.medicionService.update(+id, updateMedicionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicionService.remove(+id);
  }
  
  @Post('chirpstackpost')
  chirpstackpost(
    @Body() chirpStackPayloadDto: ChirpStackPayloadDto,
    @Query('event') event: string,
  ) {
    return this.medicionService.handleChirpstack(chirpStackPayloadDto, event);
  }
}
