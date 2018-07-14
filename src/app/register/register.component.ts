import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user$
  constructor( private auth: AuthService, private userService: UserService) {

  }

  ngOnInit() {
  }

  // newUser(user){
  //   // this.userService.newUser(user);
  //   console.log(user);
  //   this.userService.newUser(user);
  // }

  signup(user){
    console.log(user);
    let email = user.email;
    let password = user.password;
    let displayName = user.displayName;
    //console.log(email+","+password);
    this.auth.signup(email,password,displayName)
  }

}
