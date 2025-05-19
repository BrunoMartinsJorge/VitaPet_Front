import { Routes } from '@angular/router';
import { LogarContaComponent } from './pages/logar-conta/logar-conta.component';
import { AuthGuard } from './guards/GuardaRotas/auth-guard.guard';
import { ClientesComponent } from './pages/clientes-cadastrados/clientes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    // {path: '', redirectTo: 'tabela', pathMatch: 'full'}, Não sei oque caralhos é isso!
    { path: '', component: LogarContaComponent },
    { path: 'clientes-cadastrados', component: ClientesComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '**', component: LogarContaComponent },
];
