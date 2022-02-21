import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Document } from 'src/app/models/document';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentService } from '../../services/document.service';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  documents: Document[] = [];
  custId = 0;
  isUserSignedIn = false;

  constructor(
    private customerService: CustomerService,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUserSignedIn = this.customerService.currentSessionValue
      ? true
      : false;
    this.custId = parseInt(
      '' + this.customerService.currentSessionValue.customerId
    );
    this.getAllByCustomer(this.custId);
  }

  logout() {
    localStorage.removeItem('currentSession');
    this.router.navigate(['/login']);
  }

  getAllByCustomer(custId: number) {
    return this.documentService.getAllByCustomer(custId).subscribe((data) => {
      this.documents = data;
    });
  }

  download(id: string, fileName: string): void {
    this.documentService.downloadDocument(parseInt(id)).subscribe((data) => {
      FileSaver.saveAs(data, fileName);
    });
  }

  delete(id: string, fileName: string): void {
    if (confirm('Are you sure you want to delete "' + fileName + '"?'))
      this.documentService.deleteDocument(parseInt(id)).subscribe(() => {
        this.getAllByCustomer(this.custId);
      });
  }
}
