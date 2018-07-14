import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state:RouterStateSnapshot){
    return this.auth.user$.map(user=>{
      if(user){
        return true;
      }
      else{
        this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}});
        return false;
      }
    })
  }
}
