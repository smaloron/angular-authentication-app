import { Injectable } from '@angular/core';

export interface CredentialInterface {
  login: string,
  password: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authenticate(credentials: CredentialInterface) {
    return credentials.login === 'user' &&
           credentials.password === '123';
  }
}
