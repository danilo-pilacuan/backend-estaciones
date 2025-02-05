import { Test, TestingModule } from '@nestjs/testing';
import { InformeEstacionController } from './informe-estacion.controller';
import { InformeEstacionService } from './informe-estacion.service';

describe('InformeEstacionController', () => {
  let controller: InformeEstacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformeEstacionController],
      providers: [InformeEstacionService],
    }).compile();

    controller = module.get<InformeEstacionController>(InformeEstacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
