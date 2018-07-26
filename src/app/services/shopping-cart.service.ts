import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ProductObject } from './../model/product';

import { ShoppingCart } from '../model/shopping-cart';
import { Observable } from 'rxjs/internal/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId).map(x => new ShoppingCart(x.items));
  }

  async addToCart(product: ProductObject) {
    this.updateItem(product, 1)
  }

  async removeFromCart(product: ProductObject) {
    this.updateItem(product, -1)
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItems(cartId: string, productId: string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId
    } else {
      let result = await this.create();
      //console.log(result);
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

  private async updateItem(product: ProductObject, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItems(cartId, product.$key);
    items$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if (quantity == 0) items$.remove();
      else
        items$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        })
    });
  }
}
