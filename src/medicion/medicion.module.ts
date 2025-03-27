import { Module } from '@nestjs/common';
import { MedicionService } from './medicion.service';
import { MedicionController } from './medicion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoMedicion } from 'src/tipo-medicion/entities/tipo-medicion.entity';
import { Medicion } from './entities/medicion.entity';
import { MedicionHistorico } from './entities/medicion-historico.entity';
import { Estacion } from 'src/estacion/entities/estacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicion,TipoMedicion,Estacion,MedicionHistorico])],
  controllers: [MedicionController],
  providers: [MedicionService],
})
export class MedicionModule {}
