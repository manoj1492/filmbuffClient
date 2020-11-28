import { Component, OnInit } from '@angular/core';
import { CategoryModel } from './../models/CategoryModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'filmbuff';

  constructor() { }

  ngOnInit() {

  }

}
