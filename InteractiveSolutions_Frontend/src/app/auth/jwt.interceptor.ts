import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CustomerService } from '../services/customer.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private customerService: CustomerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger;
    // add auth header with jwt if account is logged in and request is to the api url
    const account = this.customerService.currentSessionValue;
    const isLoggedIn = account?.token;
    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${account.token}` },
      });
    }

    return next.handle(request);
  }
}
