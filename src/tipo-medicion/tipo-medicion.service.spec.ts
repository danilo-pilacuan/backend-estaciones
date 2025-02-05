import { Test, TestingModule } from '@nestjs/testing';
import { TipoMedicionService } from './tipo-medicion.service';

describe('TipoMedicionService', () => {
  let service: TipoMedicionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoMedicionService],
    }).compile();

    service = module.get<TipoMedicionService>(TipoMedicionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
