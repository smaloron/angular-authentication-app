import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserDataInterface, UserInterface } from '../models/user.model';
import { NotificationService } from './notification.service';
import { LocalStorageService } from 'ngx-webstorage';

export interface CredentialInterface {
  login: string,
  password: string
};

const USER_KEY = 'user';

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

  constructor(private notification: NotificationService,
    private router: Router,
    private storage: LocalStorageService) {
    
    const user = JSON.parse(storage.retrieve(USER_KEY));
    if (user) {
      this.user = new User(user);
    } else {
      this.user = new User();
    }
  }
  
  findUser(credentials: CredentialInterface): UserDataInterface | undefined {
    return this.userList.find(item => item.login == credentials.login && item.password == credentials.password);
  }

  authenticate(credentials: CredentialInterface) {
    const user = this.findUser(credentials);
    
    const isAuthenticated = user != undefined;
    
    if (isAuthenticated) {
      this.notification.setMessage('Vous êtes connecté');
      this.user = new User(user);
      this.storage.store(USER_KEY, JSON.stringify(this.user));
    }
  
    return isAuthenticated;
  }

  logout(): void {
    this.user = new User();
    this.storage.clear(USER_KEY);
    this.notification.setMessage('Vous êtes déconnecté');
    this.router.navigate(['/home'])
  }
}
