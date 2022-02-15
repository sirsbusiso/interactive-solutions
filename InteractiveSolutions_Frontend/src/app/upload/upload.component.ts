import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  errorMessage = '';
  fileName = '';

  files: File[] = [];

  constructor(private http: HttpClient) {}

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
}
