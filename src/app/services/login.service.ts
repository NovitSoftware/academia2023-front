import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // Guardar datos - ATENCIÓN: no persisten
  // esto es, si se reinicia la app, se pierde todo
  registeredUsers: {username: string, password: string}[] = [];

  constructor(private router: Router) { }

  userExists(newAccount: any){
    const found =  _.findIndex(this.registeredUsers, x => x.username === newAccount.username);
    return found >= 0;
  }

  addUser(newAccount: any){
    this.registeredUsers.push(newAccount);
  }

  checkIfLogged(){
    if (localStorage.getItem('login')) this.router.navigateByUrl("/inicio")
    else this.router.navigateByUrl("/login")
  }

  login(credentials: any): boolean{
    const found = _.findIndex(this.registeredUsers, x => x.username === credentials.username && x.password === credentials.password);
    if (found >= 0) {
      localStorage.setItem('login', 'ok');
      return true;
    };
    return false;
  }

  logout(){
    localStorage.removeItem('login');
    this.router.navigateByUrl("/login");
  }

}
