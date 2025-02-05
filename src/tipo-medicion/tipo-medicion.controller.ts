import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoMedicionService } from './tipo-medicion.service';
import { CreateTipoMedicionDto } from './dto/create-tipo-medicion.dto';
import { UpdateTipoMedicionDto } from './dto/update-tipo-medicion.dto';

@Controller('tipo-medicion')
export class TipoMedicionController {
  constructor(private readonly tipoMedicionService: TipoMedicionService) {}

  @Post()
  create(@Body() createTipoMedicionDto: CreateTipoMedicionDto) {
    return this.tipoMedicionService.create(createTipoMedicionDto);
  }

  @Get()
  findAll() {
    return this.tipoMedicionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoMedicionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoMedicionDto: UpdateTipoMedicionDto) {
    return this.tipoMedicionService.update(+id, updateTipoMedicionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoMedicionService.remove(+id);
  }
}
