import { Test, TestingModule } from '@nestjs/testing';
import { TipoMedicionController } from './tipo-medicion.controller';
import { TipoMedicionService } from './tipo-medicion.service';

describe('TipoMedicionController', () => {
  let controller: TipoMedicionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoMedicionController],
      providers: [TipoMedicionService],
    }).compile();

    controller = module.get<TipoMedicionController>(TipoMedicionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
