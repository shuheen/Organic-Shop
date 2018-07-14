import { Component, OnInit } from '@angular/core';
import { MiscService } from './../services/misc.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as _ from 'lodash'
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private miscService: MiscService, private productService: ProductService) { }
  movies = new BehaviorSubject([]);

  batch = 10         // size of each query
  lastKey = ''      // key to offset next query from
  finished = false  // boolean when end of database is reached



  ngOnInit() {
    this.getCountries()
  }

  onScroll() {
    console.log('scrolled!!')
    this.getCountries()
  }

  private getCountries(key?) {
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


}
