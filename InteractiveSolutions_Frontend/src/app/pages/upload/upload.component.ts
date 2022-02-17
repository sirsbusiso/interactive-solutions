import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  files: File[] = [];

  constructor(
    private documentService: DocumentService,
    private customerService: CustomerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.errorMessage = '';
    const file: File = event.target.files[0];

    if (file) {
      //this.fileName = file.name;
      // const formData = new FormData();
      // formData.append('file', file);
      // const upload$ = this.http.post('/api/thumbnail-upload', formData);
      // upload$.subscribe();

      if (file.size > 5242880) {
        this.errorMessage = 'Please upload a file less than 5MB in size.';
        return;
      }

      this.files.push(file);
    }
  }

  remove(index: number): void {
    this.files.splice(index, 1);
  }

  upload(): void {
    // let filesToUpload: FileToUpload[] = [];
    // let reader = new FileReader();
    // reader.onload = (e) => {
    // this.files.forEach((f) => {
    //     let file = new FileToUpload();
    //     file.custId = '' + this.customerService.currentSessionValue?.customerId;
    //     file.fileName = f.name;
    //     file.fileSize = f.size;
    //     file.fileType = f.type;
    //     file.dateAdded = new Date();
    //     file.fileAsBase64 = '' + reader.result?.toString();
    //   });
    // };
    // reader.readAsDataURL(f);
    // filesToUpload.push(file);
    // console.log(filesToUpload);
    // this.documentService.uploadDocuments(filesToUpload);
  }
}
