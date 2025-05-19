import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/ToastService/toast.service';
import { ToastModel } from '../../models/Toast.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  lista_toasts: ToastModel[] = [];
  private toastsSubscription!: Subscription;

  constructor(private toast_service: ToastService) {
  }

  ngOnInit(): void {
    this.toastsSubscription = this.toast_service.toasts$.subscribe(toasts => {
      this.lista_toasts = toasts;
      this.removerToast();
    });
  }

  ngOnDestroy(): void {
    if (this.toastsSubscription) {
      this.toastsSubscription.unsubscribe();
    }
  }

  removerToast(): void {
    this.lista_toasts.forEach((toast, i) => {
      setTimeout(() => {
        this.toast_service.removeToast(i);
      }, toast.duracao);
    });
  }

  removeToast(index: number): void {
    this.toast_service.removeToast(index);
  }
}
