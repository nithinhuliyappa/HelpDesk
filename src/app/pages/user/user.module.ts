import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { DataTableModule } from 'src/app/components/data-table/data-table.module';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    DataTableModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
