import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
})
export class PagingComponent implements OnInit {
  @Input() page: number;
  @Output() newPage = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  handlePageChange(page: number) {
    if (page > 0) {
      this.newPage.emit(page);
    }
  }
}
