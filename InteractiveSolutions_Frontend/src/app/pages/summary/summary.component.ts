import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  files: File[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {}

  getAllByCustomer() {
    //this.documentService.getAllByCustomer()
  }

  download(i: number): void {}

  remove(i: number): void {}
}
