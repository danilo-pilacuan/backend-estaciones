import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformeEstacionService } from './informe-estacion.service';
import { CreateInformeEstacionDto } from './dto/create-informe-estacion.dto';
import { UpdateInformeEstacionDto } from './dto/update-informe-estacion.dto';

@Controller('informe-estacion')
export class InformeEstacionController {
  constructor(private readonly informeEstacionService: InformeEstacionService) {}

  @Post()
  create(@Body() createInformeEstacionDto: CreateInformeEstacionDto) {
    return this.informeEstacionService.create(createInformeEstacionDto);
  }

  @Get()
  findAll() {
    return this.informeEstacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informeEstacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformeEstacionDto: UpdateInformeEstacionDto) {
    return this.informeEstacionService.update(+id, updateInformeEstacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informeEstacionService.remove(+id);
  }
}
