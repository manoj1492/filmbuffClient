import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // We can’t tamper with the original request–it needs to be immutable. To make changes we need to clone the original request
    /* if (!request.headers.get('skip')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken()
        }
      });
    } */

    return next.handle(request);
  }

}
