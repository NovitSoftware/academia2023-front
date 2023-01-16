import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(){
    if (!localStorage.getItem('login')) this.router.navigateByUrl("/login");
  }

  logout(){
    localStorage.removeItem('login');
    this.router.navigateByUrl("/login");
  }
}
