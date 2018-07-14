import { Component, OnInit } from '@angular/core';
import { MiscService } from './../services/misc.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as _ from 'lodash'
import { ProductService } from '../services/product.service';
import { ProductObject } from '../model/product';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-inf',
  templateUrl: './product-inf.component.html',
  styleUrls: ['./product-inf.component.css']
})
export class ProductInfComponent implements OnInit {
  
  
  movies = new BehaviorSubject([]);
  filteredProducts = new BehaviorSubject([]);
  batch = 12         // size of each query
  lastKey = ''      // key to offset next query from
  finished = false  // boolean when end of database is reached
  products: ProductObject[];
  subscription: Subscription;

  constructor(private miscService: MiscService, private productService: ProductService) {
    this.subscription = this.productService.getAll(this.batch + 1, this.lastKey).subscribe(products => 
      {
        this.products = products
      });
  }

  ngOnInit() {
    this.getProducts()
  }

  onScroll() {
    this.getProducts()
  }

  private getProducts(key?) {
    if (this.finished) return
    this.productService
      .getAll(this.batch + 1, this.lastKey)
        .do(movies => {

        /// set the lastKey in preparation for next query
        this.lastKey = _.last(movies)['$key']
        const newMovies = _.slice(movies, 0, this.batch)

        /// Get current movies in BehaviorSubject
        const currentMovies = this.movies.getValue()

        /// If data is identical, stop making queries
        if (this.lastKey == _.last(newMovies)['$key']) {
          this.finished = true
        }

        /// Concatenate new movies to current movies
        this.movies.next(_.concat(currentMovies, newMovies))
      })
      .take(1)
      .subscribe()
  }

  filter(query: string){
    let filteredProducts = (query) ?
    this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

}
