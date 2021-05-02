import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      const dialogRef = this.dialog.open(
        LoginComponent,
        { height: 'auto', width: 'auto'}
      );
      return false;
    }
    return new Promise(resolve => {
        if (!this.authService.isLoggedIn()) {
          const dialogRef = this.dialog.open(
            LoginComponent,
            { height: 'auto', width: 'auto'}
          );
          resolve(true);
        }
        resolve(true); }
      );
  }

}
