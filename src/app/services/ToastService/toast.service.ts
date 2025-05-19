import { Injectable } from '@angular/core';
import { ToastModel } from '../../models/Toast.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  listaToast: ToastModel[] = [];

  private toastsSubject = new BehaviorSubject<ToastModel[]>([]);

  toasts$ = this.toastsSubject.asObservable();

  constructor() {
  }

  addToast(toast: ToastModel): void {
    const currentToasts = this.toastsSubject.value;
    const newToast = toast;
    this.toastsSubject.next([...currentToasts, newToast]);
  }

  removeToast(index: number): void {
    const currentToasts = this.toastsSubject.value;
    currentToasts.splice(index, 1);
    this.toastsSubject.next([...currentToasts]);
  }
}
