import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login={Username:"",Password:""}
  LoginError='';

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

Login(){
  this.LoginError=''
  if(this.login.Username==this.login.Password){
    this.router.navigate(['Main']);
  }
  else{
    this.LoginError="Username or password incorrect.";
  }
}
  
}
