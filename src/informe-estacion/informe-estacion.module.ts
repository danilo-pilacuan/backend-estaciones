import { Module } from '@nestjs/common';
import { InformeEstacionService } from './informe-estacion.service';
import { InformeEstacionController } from './informe-estacion.controller';

@Module({
  controllers: [InformeEstacionController],
  providers: [InformeEstacionService],
})
export class InformeEstacionModule {}
