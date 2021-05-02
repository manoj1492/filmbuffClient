import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LOGIN } from '../app.constants';
import { LoginModel } from '../login/LoginModel';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private httpClient: HttpClient) { }

login(loginModel: LoginModel) {
  //return this.httpClient.post<any>(environment.auth + LOGIN , loginModel, {headers: {skip: 'true'}});
  return this.httpClient.post<any>(environment.auth + LOGIN , loginModel);
}

setSession(authResult: any) {
  const expiresAt = moment(authResult.expiresOn);

  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  console.log(authResult.user);
}

logout() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
}

public isLoggedIn() {
  if (!this.getExpiration()) {
    return false;
  }
  return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  return !this.isLoggedIn();
}

getExpiration() {
  const expiration = localStorage.getItem('expires_at');
  if (!expiration) {
    return null;
  }
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}

getToken() {
  return localStorage.getItem('id_token');
}

}
