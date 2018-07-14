import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './../model/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private userService: UserService,
    private frAuth: AngularFireAuth, private route: ActivatedRoute,  private db:AngularFireDatabase) {
    this.user$  = frAuth.authState;
   
  }


  login(){
    this.returnUrl();
    this.frAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }


  signup(email, password, displayName){
    var user = null;
    this.returnUrl();
    this.frAuth.auth.createUserWithEmailAndPassword(email, password).then(function(user) {
      //console.log(user);
      // [END createwithemail]
      // callSomeFunction(); Optional
      user = firebase.auth().currentUser;
      
      //console.log(user.updateProfile());
      user.updateProfile({
          displayName: displayName
      }).then(function() {
        //firebase.auth().currentUser.getIdToken(true);
        console.log("Updated");
          // Update successful.
      }, function(error) {
        console.log(error);
          // An error happened.
      });        
  }, function(error) {
      // Handle Errors here.
      //var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // [START_EXCLUDE]
      // if (errorCode == 'auth/weak-password') {
      //     alert('The password is too weak.');
      // } else {
      //     console.error(error);
      // }
      // [END_EXCLUDE]
  });
  }

  signIn(email, password){
    this.returnUrl();
    this.frAuth.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorMessage);
      // ...
    });
  }

  

  returnUrl(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }
  

  logout(){
    this.frAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser>{
    return this.user$
      .switchMap(user => {
        if(user){
         return this.userService.get(user.uid)
        }else{
          return Observable.of(null);
        }
      })
  }
}
