import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-ticket",
  templateUrl: "./add-ticket.component.html",
  styleUrls: ["./add-ticket.component.scss"]
})
export class AddTicketComponent implements OnInit {
  constructor(private router: Router) {}

  priorityHasError = true;
  departmentHasError = true;

  ngOnInit() {}

  validateDepartment(value) {
    if (value === "default") {
      this.departmentHasError = true;
    } else {
      this.departmentHasError = false;
    }
  }

  validatePriority(value) {
    if (value === "default") {
      this.priorityHasError = true;
    } else {
      this.priorityHasError = false;
    }
  }

  ticketSubmit(ticket) {
    //const callback = () => this.router.navigate(["/home"]);
  }

  cancel() {
    this.router.navigate(["/home"]);
  }
}
