import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // We can’t tamper with the original request–it needs to be immutable. To make changes we need to clone the original request
    if (!request.headers.get('skip')) {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.authService.getToken(),
        'Content-Type': 'application/json'
        //'Access-Control-Allow-Origin' : '*'
      });
      request = request.clone({
        headers
      });
    }

    return next.handle(request);
  }

}
