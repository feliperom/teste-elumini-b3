import { TestBed, inject } from '@angular/core/testing';
import { CdbCalculatorService } from './cdb-calculator.service';

describe('CdbCalculatorService', () => {
  let service: CdbCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdbCalculatorService]
    });
    service = TestBed.inject(CdbCalculatorService);
  });

  it('deve calcular o valor final do CDB corretamente', () => {
    const valorInicial = 1000;
    const CDI = 0.05;
    const TB = 0.005;
    const prazoMeses = 12;
    const impostoEsperado = 0.20 * valorInicial * CDI * prazoMeses;
    const VFEsperado = valorInicial * (1 + (CDI * TB)) ** prazoMeses - impostoEsperado;

    const VFAtual = service.calcularCDB(valorInicial, CDI, TB, prazoMeses);

    expect(VFAtual).toBeCloseTo(VFEsperado, 2);
  });

  it('deve calcular o imposto corretamente para prazos diferentes', () => {
    const valorInicial = 1000;
    const CDI = 0.05;
    const TB = 0.005;

    const prazosMeses = [
      { prazo: 6, impostoEsperado: 0.225 },
      { prazo: 12, impostoEsperado: 0.20 },
      { prazo: 24, impostoEsperado: 0.175 },
      { prazo: 36, impostoEsperado: 0.15 }
    ];

    for (const { prazo, impostoEsperado } of prazosMeses) {
      const impostoAtual = service.calcularImposto(prazo);
      expect(impostoAtual).toBeCloseTo(impostoEsperado, 2);
    }
  });

  // Teste para a função obterCDIMesSeguinte (opcional)

  it('deve obter o CDI do próximo mês corretamente', () => {
    const CDI = 0.05;
    const CDIAtual = service.obterCDIMesSeguinte(CDI);

    expect(CDIAtual).toBeCloseTo(CDI + 0.001, 2);
  });
});
