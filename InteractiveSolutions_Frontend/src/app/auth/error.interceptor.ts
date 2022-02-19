import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private customerService: CustomerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return throwError(() => new Error('Unauthorized'));
        } else {
          console.log(error);
          return throwError(() => new Error(error));
        }
      })
    );
  }
}
