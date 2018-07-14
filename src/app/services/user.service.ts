import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './../model/app-user';
@Injectable()
export class UserService {

  constructor( private db: AngularFireDatabase) {
    
  }

  save(user: firebase.User){
    this.db.object('/users/'+ user.uid).update({
      displayName: user.displayName,
      email: user.email,
    }); 
  }

  newUser(user: {}){
     this.db.list('/users').push(user);
  }



  get(uid: string): FirebaseObjectObservable<AppUser>{
    return this.db.object('/users/' + uid);
  }
}
