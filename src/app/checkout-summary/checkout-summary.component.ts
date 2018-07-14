import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css']
})
export class CheckoutSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;

  ngOnInit(){
    console.log(this.cart);
  }
}
 