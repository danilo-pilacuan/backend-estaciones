import { Module } from '@nestjs/common';
import { TipoMedicionService } from './tipo-medicion.service';
import { TipoMedicionController } from './tipo-medicion.controller';

@Module({
  controllers: [TipoMedicionController],
  providers: [TipoMedicionService],
})
export class TipoMedicionModule {}
