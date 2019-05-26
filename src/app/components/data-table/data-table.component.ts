import { Component,
         OnInit,
         Input,
         QueryList,
         ContentChildren } from '@angular/core';
import { ColumnConfig } from './data-table.config';
import { CellTemplateDirective } from './cell-template.directive';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input()
  columns: ColumnConfig;

  @Input()
  set data(d: any[]) {
    if (d) {
      this._data = d;
      this.page = 1;
      this.total.next(d.length);
      this.setDisplayData();
    }
  }

  get data() {
    return this._data;
  }

  @ContentChildren(CellTemplateDirective)
  cellTmplList: QueryList<CellTemplateDirective>;

  _data: any[];
  displayData = new BehaviorSubject<any[]>([]);
  pageSize = 10;
  total = new BehaviorSubject<number>(0);
  page = 1;

  constructor() { }

  ngOnInit() {
  }

  getTemplateRef(name) {
    if (this.cellTmplList) {
      const cell = this.cellTmplList.toArray().find(c => c.cellTemplate === name);
      return cell.getTemplateRef();
    }
  }

  setDisplayData() {
    const data = this._data.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    this.displayData.next(data);
  }

  onPageChange(page: number) {
    this.page = page;
    this.setDisplayData();
  }

}
