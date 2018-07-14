import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.auth.login();
  }

  signIn(user){
    var email = user.email;
    var password = user.password;
    console.log(user);
    // this.auth.signup(email,password)
    this.auth.signIn(email,password);
  }

}
