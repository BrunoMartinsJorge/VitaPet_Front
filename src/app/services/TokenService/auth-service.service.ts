import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  tokenExists(): boolean {
    return localStorage.getItem('token') != null;
  }
}
