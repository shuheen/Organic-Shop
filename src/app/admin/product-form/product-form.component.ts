import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product={};
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService:ProductService) {
    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProductById(this.id).take(1).subscribe(p=>this.product = p);
  }

  ngOnInit() {
  }

  // getfullObject(product){
  //   let identifier = product.name;
  //   return identifier;
  // }

  save(product){
    if(this.id) this.productService.updateProductById(this.id, product)
    else this.productService.create(product);

    this.router.navigate(['/admin/admin-products']);
  }


  delete(){
    if(!confirm('Are you sure you want to delete this item')) return;

    this.productService.deleteProductById(this.id);
    this.router.navigate(['/admin/admin-products']);
  }

}
