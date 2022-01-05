import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isAuthenticated = false;
  isSubmitted = false;

  constructor(private security: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  validateForm(): void {
    this.isSubmitted = true;
    this.isAuthenticated = this.security.authenticate(this.userInput);
    if (this.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

}
