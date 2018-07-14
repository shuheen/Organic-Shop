import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../model/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MiscService } from '../services/misc.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../model/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  countries$;
  states$;
  shipping = {};
  countrySelected;
  userId: string;
  userSubscription: Subscription;
  constructor(
    private route: Router,
    private miscSerive: MiscService,
    private orderService:OrderService,
    private authService: AuthService) { }


  
  async getStates(value){
    this.states$ = await this.miscSerive.fetchStates(value);
  }

  async ngOnInit() {
    this.countries$ = this.miscSerive.fetchCountries();
    this.countrySelected == "";
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async proceed(shipping){
    let order = new Order(this.userId, shipping, this.cart)
    let result  = await this.orderService.storeOrder(order);
    this.route.navigate(['/order-success/'+ result.key]);
  }


}
