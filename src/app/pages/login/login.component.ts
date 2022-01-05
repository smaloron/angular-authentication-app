import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CredentialInterface } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInput: CredentialInterface = {
    login: '',
    password: ''
  };

  constructor(private security: AuthenticationService) { }

  ngOnInit(): void {
  }

  validateForm(): void {
    if (this.security.authenticate(this.userInput)) {
      console.log('ok');
    } else {
      console.log('KO');
    }
  }

}
