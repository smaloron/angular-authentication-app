import { Injectable } from '@angular/core';
import { User, UserInterface } from '../models/user.model';

export interface CredentialInterface {
  login: string,
  password: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: UserInterface;

  constructor() {
    this.user = new User();
   }

  authenticate(credentials: CredentialInterface) {
    const isAuthenticated = credentials.login === 'user' &&
      credentials.password === '123';
    
    if (isAuthenticated) {
      this.user = new User({
        userName: 'Defaut User',
        login: credentials.login
      });
    }

    return isAuthenticated;
  }

  logout(): void {
    this.user = new User();
  }
}
