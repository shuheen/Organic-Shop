import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AppUser } from './../model/app-user';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Observable } from 'rxjs/internal/Observable';
import { ShoppingCart } from './../model/shopping-cart';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
    
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser=>this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }


  logout(){
    this.auth.logout();
  }
}
