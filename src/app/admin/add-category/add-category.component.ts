import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from './../../services/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  addCategory(category){
    this.categoryService.addCategory(category);
    // console.log(category)
  }

}
