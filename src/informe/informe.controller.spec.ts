import { Test, TestingModule } from '@nestjs/testing';
import { InformeController } from './informe.controller';
import { InformeService } from './informe.service';

describe('InformeController', () => {
  let controller: InformeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformeController],
      providers: [InformeService],
    }).compile();

    controller = module.get<InformeController>(InformeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
