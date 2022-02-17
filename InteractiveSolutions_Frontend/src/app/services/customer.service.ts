import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  baseUrl = environment.apiBaseUrl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse('' + localStorage.getItem('currentSession'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get currentSessionValue(): User {
    return this.userSubject.value;
  }

  login(idNumber: string) {
    return this.http
      .post(this.baseUrl + '/Customer/Login', {
        idNumber: idNumber,
      })
      .pipe(
        map((response: any) => {
          // login successful if there's a jwt token in the response
          if (response && response.token) {
            // store response details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentSession', JSON.stringify(response));
            this.userSubject.next(response);
          }

          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentSession');
    this.userSubject.next(
      JSON.parse('' + localStorage.getItem('currentSession'))
    );
  }
}
