import { Component, OnInit } from '@angular/core';
import { MiscService } from './../services/misc.service';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCart } from './../model/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from './../services/order.service';
import { AuthService } from './../services/auth.service';
import { Order } from './../model/order';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // shippingForm;
  
  cart$: Observable<ShoppingCart>;
  
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
