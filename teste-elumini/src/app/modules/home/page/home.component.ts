import { Component } from '@angular/core';
import { CdbCalculatorService } from '../cdb-calculator.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  valorInicial: number;
  taxaCDI: number = 0.09;
  taxaBanco: number = 1.8;
  prazo: number;
  valorFinal: number;

  constructor(private cdbCalculatorService: CdbCalculatorService) {}

  calcularInvestimento(): void {
    this.valorFinal = this.cdbCalculatorService.calcularCDB(this.valorInicial, this.taxaCDI, this.taxaBanco, this.prazo);
  }
}
