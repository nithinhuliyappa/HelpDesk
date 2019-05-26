import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CellTemplateDirective } from './cell-template.directive';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  declarations: [DataTableComponent, CellTemplateDirective],
  imports: [
    CommonModule,
    NgbModule,
    PaginationModule
  ],
  exports: [DataTableComponent, CellTemplateDirective]
})
export class DataTableModule { }
