import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {

  }

  create(product) {
    this.db.list('/products').push(product)
  }

  fetchAll(){
    return this.db.list('/products');
  }

  getAll(batch, lastKey?) {
    let query = {
      orderByKey: true,
      limitToFirst: batch,
    }
    if (lastKey) query['startAt'] = lastKey

    return this.db.list('/products', {
      query
    })
  }

  getProductById(productId) {
    return this.db.object('/products/' + productId)
  }

  updateProductById(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  deleteProductById(productId) {
    this.db.object('/products/' + productId).remove();
  }
}
