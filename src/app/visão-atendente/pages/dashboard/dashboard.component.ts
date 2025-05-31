import { Component } from '@angular/core';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  clienteSelecionado: any = null;
  dialogVisivel: boolean = false;

  abrirDialog(cliente: any) {
    this.clienteSelecionado = cliente;
    this.dialogVisivel = true;
  }

  clientes: any[] = [];
}
