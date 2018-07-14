import { Component, OnInit, Input } from '@angular/core';
import { ProductObject } from '../model/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.css']
})
export class CartButtonComponent implements OnInit {
  @Input('products') products: ProductObject;
  @Input('shopping-cart') shoppingCart;

  constructor( private cartService: ShoppingCartService) {
    // console.log(this.shoppingCart);
  }

  ngOnInit() {
  }
  
  addToCart(){
    this.cartService.addToCart(this.products);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.products);
  }
  
}
