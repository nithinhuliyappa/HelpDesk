import { Component, OnInit } from '@angular/core';
import { TICKET_STATUS, TICKET_PRIORITY } from 'src/app/metadata/ticket.metadata';
import { FormGroup, FormControl } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-filter',
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss']
})
export class TicketFilterComponent implements OnInit {

  isCollapsed = true;
  form: FormGroup;

  constructor(private ticket: TicketService) { }

  get statusList() {
    return TICKET_STATUS;
  }

  get priorityList() {
    return TICKET_PRIORITY;
  }

  ngOnInit() {
    this.form = new FormGroup({
      status: new FormControl(''),
      priority: new FormControl('')
    });
  }

  onSubmit(form) {
    this.ticket.applyFilter(form.value);
  }

  reset() {
    this.form.reset({
      status: '',
      priority: ''
    });
  }

}
