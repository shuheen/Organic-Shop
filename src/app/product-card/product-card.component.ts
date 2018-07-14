import { Component, OnInit, Input } from '@angular/core';
import { ProductObject } from './../model/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('products') products: ProductObject;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor( private cartService: ShoppingCartService) { }

  ngOnInit() {
  }
  
  addToCart(){
    this.cartService.addToCart(this.products);
  }

}
