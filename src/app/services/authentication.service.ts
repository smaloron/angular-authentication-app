import { Injectable } from '@angular/core';
import { User, UserDataInterface, UserInterface } from '../models/user.model';

export interface CredentialInterface {
  login: string,
  password: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: UserInterface;

  userList: UserDataInterface[] = [
    { login: 'Ada', userName: 'Ada Lovelace', password: '123' },
    { login: 'Toto', userName: 'Toto le héros', password: '123' },
    { login: 'Pauline', userName: 'Pauline Martin', password: '123' },
    { login: 'grace', userName: 'Grace Hopper', password: '456' },
    { login: 'Alan', userName: 'Alan Turing', password: '456' },
  ]

  constructor() {
    this.user = new User();
  }
  
  findUser(credentials: CredentialInterface): UserDataInterface | undefined {
    return this.userList.find(item => item.login == credentials.login && item.password == credentials.password);
  }

  authenticate(credentials: CredentialInterface) {
    const user = this.findUser(credentials);
    
    const isAuthenticated = user != undefined;
    
    if (isAuthenticated) {
      this.user = new User(user);
    }

    return isAuthenticated;
  }

  logout(): void {
    this.user = new User();
  }
}
