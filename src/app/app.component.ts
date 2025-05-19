import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./shared/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, CommonModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Componentes';

  isLogedIn: boolean = false;
  constructor(){

  }

  ngOnInit(): void {
    this.isLogedIn = window.localStorage.getItem('token') ? true : false;
  }
}
