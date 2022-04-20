import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignedIn = false;

  constructor(private router : Router, public authService: AuthserviceService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')!==null)
    this.isSignedIn=true;
    else
    this.isSignedIn=false;
  }
  async onSignup(email:string, password:string){
    await this.authService.singup(email, password)
    if(this.authService.isLoggedIn){
    this.isSignedIn=true;
    }
  }
  async onSignin(email:string, password:string){
    await this.authService.singin(email, password)
    if(this.authService.isLoggedIn){
    this.isSignedIn=true;
    }
  }

}
