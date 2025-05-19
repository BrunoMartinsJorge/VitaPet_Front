import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  listaLinks: any[] = [{ label: "Dashboard", icon: "fa-chart-line", link: "/dashboard"}, {label: "Consultas", icon: "fa-calendar-plus", link: "/consultas"}, {label: "Clientes", icon: "fa-user-group", link: "/clientes-cadastrados"}, {label: "Animais", icon: "fa-paw"}];
  linkAtivo: string = this.listaLinks[0].label;

  sidebarEstaAberta: boolean = false;

  abrirSidebar(): void {
    this.sidebarEstaAberta = true;
  }

  fecharSidebar(): void {
    this.sidebarEstaAberta = false;
  }

  linkAtivado(link: any): void {
    this.linkAtivo = link.label;
    console.log(link);
  }

}
