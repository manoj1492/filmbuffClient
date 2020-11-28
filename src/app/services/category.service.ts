import { CategoryModel } from '../models/CategoryModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>('http://localhost:8081/api/category/');
  }
}
