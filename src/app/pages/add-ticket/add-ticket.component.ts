import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TICKET_PRIORITY, TICKET_DEPARTMENT } from 'src/app/metadata/ticket.metadata';
import { UserService } from 'src/app/services/user.service';
import { TicketService } from 'src/app/services/ticket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {

  constructor(private router: Router,
              private ticket: TicketService,
              private user: UserService,
              private toastr: ToastrService) {}

  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      subject: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      department: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  get priorityList() {
    return TICKET_PRIORITY;
  }

  get departmentList() {
    return TICKET_DEPARTMENT;
  }

  // validateDepartment(value) {
  //   if (value === 'default') {
  //     this.departmentHasError = true;
  //   } else {
  //     this.departmentHasError = false;
  //   }
  // }

  // validatePriority(value) {
  //   if (value === 'default') {
  //     this.priorityHasError = true;
  //   } else {
  //     this.priorityHasError = false;
  //   }
  // }

  ticketSubmit() {
    const value = this.form.value;
    this.ticket
    .addTicket(value, this.user.userProfile.uid)
    .then((key: string) => {
      this.router.navigate(['/tickets']);
      this.toastr.success('Ticket successfully added', 'success');
    })
    .catch(error => console.log(error));
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}
