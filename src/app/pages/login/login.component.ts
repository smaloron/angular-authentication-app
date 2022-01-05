import { Component, OnInit } from '@angular/core';
import { CredentialInterface } from 'src/app/services/authentication.service';

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

  constructor() { }

  ngOnInit(): void {
  }

}
