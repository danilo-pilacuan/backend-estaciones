import { Module } from '@nestjs/common';
import { EstacionService } from './estacion.service';
import { EstacionController } from './estacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estacion } from './entities/estacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estacion])],
  controllers: [EstacionController],
  providers: [EstacionService],
})
export class EstacionModule {}
