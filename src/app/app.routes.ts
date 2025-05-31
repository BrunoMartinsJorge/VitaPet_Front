import { Routes } from '@angular/router';
import { LogarContaComponent } from './pages/logar-conta/logar-conta.component';
import { AuthGuard } from './guards/GuardaRotas/auth-guard.guard';
import { DashboardComponent } from './visão-atendente/pages/dashboard/dashboard.component';
import { ClientesComponent } from './visão-atendente/pages/clientes-cadastrados/clientes.component';
import { PetsCadastradosComponent } from './visão-atendente/pages/pets-cadastrados/pets-cadastrados.component';

export const routes: Routes = [
  // {path: '', redirectTo: 'tabela', pathMatch: 'full'}, Não sei oque caralhos é isso!
  { path: '', component: LogarContaComponent },
  {
    path: 'clientes-cadastrados',
    component: ClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pets-cadastrados',
    component: PetsCadastradosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: LogarContaComponent },
];
