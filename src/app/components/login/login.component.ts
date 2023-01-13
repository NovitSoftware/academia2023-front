import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Estados
  failedLogin: boolean = false;
  notRegistered: boolean = false;
  registrationOk: boolean = false;
  usernameAlreadyExists: boolean = false;

  // Guardar datos - ATENCIÓN: no persisten
  registeredUsers: {username: string, password: string}[] = [];

  // Formulario
  loginForm = new FormGroup({
    username: new FormControl<string>('', {nonNullable: true, validators: Validators.required}),
    password: new FormControl<string>('',  {nonNullable: true, validators: Validators.required}),
  });

  constructor(private router: Router){}

  ngOnInit(){
    if (localStorage.getItem('login')) this.router.navigateByUrl("/inicio");
  }

  createAccount(){
    this.loginForm.setValue({username: "", password: ""});
    this.notRegistered = !this.notRegistered;
    this.registrationOk = this.usernameAlreadyExists = this.failedLogin = false;
  }

  registerAccount(){
    this.usernameAlreadyExists = this.registrationOk = false;

    const newAccount = {
      username: this.loginForm.get('username')!.value.toLowerCase(), 
      password: this.loginForm.get('password')!.value
    };

    const userExists = _.findIndex(this.registeredUsers, x => x.username === newAccount.username);
    if (userExists >= 0) {
      this.usernameAlreadyExists = true;
      return
    };

    this.registeredUsers.push(newAccount);
    this.registrationOk = true;
  }

  login(){
    this.failedLogin = false;

    const credentials = {
      username: this.loginForm.get('username')!.value.toLowerCase(), 
      password: this.loginForm.get('password')!.value
    };

    const loginOk = _.findIndex(this.registeredUsers, x => x.username === credentials.username && x.password === credentials.password);
    if (loginOk >= 0) {
      localStorage.setItem('login', 'ok');
      this.router.navigateByUrl("/inicio")
      return
    };

    this.failedLogin = true;
  }

}
