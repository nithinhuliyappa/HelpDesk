import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { Routes, RouterModule } from '@angular/router';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketComponent } from './ticket.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'src/app/components/data-table/data-table.module';
import { TicketFilterComponent } from './ticket-filter/ticket-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketCommentsComponent } from './ticket-comments/ticket-comments.component';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent
  }
];

@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailsComponent,
    TicketComponent,
    TicketFilterComponent,
    TicketCommentsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    DataTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    TicketComponent
  ]
})
export class TicketModule { }
