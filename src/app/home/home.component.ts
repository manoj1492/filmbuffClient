import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'filmbuff';

  constructor(public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    console.log("In Home");
  }

  logout() {
    this.authService.logout();
  }

}
