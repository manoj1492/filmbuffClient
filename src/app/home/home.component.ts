import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'filmbuff';

  constructor(public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {

    /* const dialogRef = this.dialog.open(
        LoginComponent,
        { height: 'auto', width: 'auto', disableClose: true}
      );
 */
  }

  logout() {
    this.authService.logout();
  }

}
