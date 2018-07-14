import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { Subscription } from 'rxjs';
import { ProductObject } from './../../model/product';
import { DataTableResource } from 'angular5-data-table';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: ProductObject[];
  subscription: Subscription;
  tableResource: DataTableResource<ProductObject>;
  items: ProductObject[] = [];
  itemCount: number;
  batch: number  = 20;
  user;
  constructor( private productService: ProductService) {
    this.subscription = this.productService.getAll(this.batch).subscribe(products => 
      {
        this.products = products
        this.initializeTable(products);
      });
      
  }

  ngOnInit() {
  }


  private initializeTable(products: ProductObject[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({offset:0})
      .then(items=>this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }


  filter(query: string){
    let filteredProducts = (query) ?
    this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLowerCase())) :
    this.products;

    this.initializeTable(filteredProducts);
  }


  reloadItems(params){
    if(!this.tableResource) return;
    this.tableResource.query(params)
      .then(items=>this.items = items);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
