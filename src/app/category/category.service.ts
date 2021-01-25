import { CATEGORY } from './../app.constants';
import { CategoryModel } from './CategoryModel';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<CategoryModel[]> {

    let httpHeaders = new HttpHeaders();
    //httpHeaders = httpHeaders.append('skip', 'true');
    //, { headers: httpHeaders}
    return this.httpClient.get<CategoryModel[]>(environment.api + CATEGORY);
  }
}
