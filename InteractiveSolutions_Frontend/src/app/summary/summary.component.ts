import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  files: File[] = [];

  constructor() {}

  ngOnInit(): void {}

  download(i: number): void {}

  remove(i: number): void {}
}
