import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CdbCalculatorService {

  constructor() { }

  calcularCDB(valorInicial: number, CDI: number, TB: number, prazoMeses: number): number {
    let VF = valorInicial * (1 + (CDI * TB));
    let imposto = this.calcularImposto(prazoMeses);

    for (let i = 1; i < prazoMeses; i++) {
        CDI = this.obterCDIMesSeguinte(CDI); // Supondo que você tenha uma função para obter o CDI do próximo mês
        VF *= (1 + (CDI * TB));
    }
    return VF - imposto;
  }

  // Função hipotética para obter o CDI do próximo mês
  obterCDIMesSeguinte(CDI: number): number {
    // Aqui você implementaria a lógica para obter o CDI do próximo mês, por exemplo, a partir de uma API ou de outra fonte de dados
    // Por enquanto, vamos apenas retornar um valor fixo para fins de demonstração
    return CDI + 0.001; // Supondo um aumento de 0.1% no CDI a cada mês
  }

  // Função para calcular o imposto sobre o lucro com base no prazo em meses
  calcularImposto(prazoMeses: number): number {
    if (prazoMeses <= 6) {
        return 0.225; // 22.5% de imposto sobre o lucro
    } else if (prazoMeses <= 12) {
        return 0.20; // 20% de imposto sobre o lucro
    } else if (prazoMeses <= 24) {
        return 0.175; // 17.5% de imposto sobre o lucro
    } else {
        return 0.15; // 15% de imposto sobre o lucro
    }
  }
}
