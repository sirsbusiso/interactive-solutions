import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileToUpload } from 'src/app/models/fileToUpload';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  errorMessage = '';
  fileName = '';
  isUserSignedIn = false;

  documents: FileToUpload[] = [];

  constructor(
    private documentService: DocumentService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isUserSignedIn = this.customerService.currentSessionValue
      ? true
      : false;
  }

  onFileSelected(event: any): void {
    this.errorMessage = '';
    const file: File = event.target.files[0];

    if (file) {
      if (file.size > 5242880) {
        this.errorMessage = 'Please upload a file less than 5MB in size.';
        return;
      }

      if (file.type !== 'application/pdf') {
        this.errorMessage = 'File type accepted is PDF only.';
        return;
      }

      let reader = new FileReader();

      reader.onload = (e) => {
        let fileToUpload = new FileToUpload();

        fileToUpload.custId = parseInt(
          '' + this.customerService.currentSessionValue?.customerId
        );
        fileToUpload.fileName = file.name;
        fileToUpload.fileSize = file.size;
        fileToUpload.fileType = file.type;
        fileToUpload.dateAdded = new Date();
        fileToUpload.fileAsBase64 = '' + reader.result?.toString();

        this.documents.push(fileToUpload);
      };

      reader.readAsDataURL(file);
    }
  }

  remove(index: number): void {
    this.documents.splice(index, 1);
  }

  upload(): void {
    this.documentService
      .uploadDocuments({ documents: this.documents })
      .subscribe((data) => {
        if (data > 1) {
          this.router.navigate(['/summary']);
        } else {
          alert(
            'There was a problem with your document upload. Contact the site administrator for more info.'
          );
        }
      });
  }

  logout() {
    localStorage.removeItem('currentSession');
    this.router.navigate(['/login']);
  }
}
