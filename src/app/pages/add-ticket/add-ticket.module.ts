import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AddTicketComponent } from "./add-ticket.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AddTicketComponent
  }
];

@NgModule({
  declarations: [AddTicketComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class AddTicketModule {}
