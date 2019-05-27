import { Component,
         OnInit,
         Input,
         Output,
         EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  set total(t: number) {
    this._total = t;
    this._page = 1;
  }

  get total() {
    return this._total;
  }

  @Input()
  pageSize: number;

  @Output()
  pageChange = new EventEmitter<number>();

  start = 0;
  end = 0;
  _page = 1;
  _total = 0;

  constructor() { }

  ngOnInit() {
    this.calcRange();
  }

  get page() {
    return this._page;
  }

  set page(p: number) {
    this._page = p;
    this.calcRange();
    this.pageChange.emit(p);
  }

  calcRange() {
    this.start = (this.page === 1) ? 1 : (this.page - 1) * this.pageSize;
    this.end = (this.page * this.pageSize > this.total) ? this.total : this.page * this.pageSize;
  }

}
