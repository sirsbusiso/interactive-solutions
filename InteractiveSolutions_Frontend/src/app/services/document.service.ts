import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../models/document';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllByCustomer(custId: number): Observable<any> {
    let headers = { ['Content-Type']: 'application/json' };

    return this.http.get<Document[]>(
      this.baseUrl + '/Document/GetAllByCustomer/' + custId,
      { headers }
    );
  }

  uploadDocuments(documents: any) {
    debugger;

    return this.http.post(this.baseUrl + '/Document', { documents });
  }
}
