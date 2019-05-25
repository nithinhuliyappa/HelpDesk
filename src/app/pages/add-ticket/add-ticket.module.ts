import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTicketComponent } from './add-ticket.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddTicketComponent
  }
];

@NgModule({
  declarations: [AddTicketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AddTicketModule { }
