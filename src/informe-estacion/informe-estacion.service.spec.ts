import { Test, TestingModule } from '@nestjs/testing';
import { InformeEstacionService } from './informe-estacion.service';

describe('InformeEstacionService', () => {
  let service: InformeEstacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformeEstacionService],
    }).compile();

    service = module.get<InformeEstacionService>(InformeEstacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
