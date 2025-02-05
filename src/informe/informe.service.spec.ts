import { Test, TestingModule } from '@nestjs/testing';
import { InformeService } from './informe.service';

describe('InformeService', () => {
  let service: InformeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformeService],
    }).compile();

    service = module.get<InformeService>(InformeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
