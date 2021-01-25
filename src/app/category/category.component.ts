import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { CategoryModel } from './CategoryModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: CategoryModel[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categoryList => {
      this.categories = categoryList;
    });
  }

}
