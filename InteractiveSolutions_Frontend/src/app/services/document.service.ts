import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Document } from '../models/document';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  baseUrl = environment.apiBaseUrl + '/Document';

  constructor(private http: HttpClient) {}

  getAllByCustomer(custId: number): Observable<any> {
    return this.http.get<Document[]>(
      this.baseUrl + '/GetAllByCustomer/' + custId
    );
  }

  uploadDocuments(documents: any) {
    return this.http.post<any>(this.baseUrl + '/', documents);
  }

  downloadDocument(id: number) {
    return this.http.get(this.baseUrl + '/Download/' + id, {
      responseType: 'blob' as const,
    });
  }

  deleteDocument(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
