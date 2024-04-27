import { Component, OnInit } from '@angular/core';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { Cotacao } from '../../models/cotacao.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cotacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotacoes.component.html',
  styleUrl: './cotacoes.component.css'
})
export class CotacoesComponent implements OnInit {

  cotacoes: Cotacao[] = [];

  constructor(
    private apiService: AwesomeApiService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.apiService.getCotacoes().subscribe((cotacoes: Cotacao[]) => {
      this.cotacoes = cotacoes;
    });
  }

  goToConversor(cotacao: Cotacao) {
    
    let moedaOrigem$ = this.apiService.getMoeda(cotacao.code);
    let moedaDestino$ = this.apiService.getMoeda(cotacao.codein);

    forkJoin([moedaOrigem$, moedaDestino$]).subscribe((moedas) => {
      let moedaOrigem = moedas.shift();
      let moedaDestino = moedas.shift();
      if (moedaOrigem && moedaDestino) {
        this.sharedDataService.setMoedas(moedaOrigem, moedaDestino);
        this.router.navigate(['/conversor']);
      }
    });
    
    
  }

}
