import { Routes } from '@angular/router';
import { ConversorComponent } from './components/conversor/conversor.component';
import { CotacoesComponent } from './components/cotacoes/cotacoes.component';

export const routes: Routes = [
    { path: '', redirectTo: 'conversor', pathMatch: 'full' },
    { path: 'conversor', component: ConversorComponent },
    { path: 'cotacoes', component: CotacoesComponent }
];
