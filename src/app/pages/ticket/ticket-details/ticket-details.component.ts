import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Ticket, TICKET_STATUS, TICKET_PRIORITY } from 'src/app/metadata/ticket.metadata';
import { UserService } from 'src/app/services/user.service';
import { TicketService } from 'src/app/services/ticket.service';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  @Input() ticketFromParent: Ticket;
  statusOptions = TICKET_STATUS;
  priorityOptions = TICKET_PRIORITY;

  editTicketForm: FormGroup;

  @Output()
  closeModal = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private ticket: TicketService,
              private user: UserService) { }


  ngOnInit(): void {
    this.buildForm();
    this.editTicketForm.patchValue(this.ticketFromParent);
  }

  get isAdmin() {
    return this.user.userProfile.role === 'admin';
  }

  get admins() {
    return this.ticket.admins;
  }

  get isPending() {
    return this.ticketFromParent.status === 'pending';
  }

  getStatus(key) {
    return TICKET_STATUS.find(status => key === status.value).label;
  }

  resolveTicket() {
    const form = this.editTicketForm.value as Ticket;
    form.status = 'resolved';
    this.updateTicket(form);
  }

  private buildForm() {
    this.editTicketForm = this.fb.group(
      {
        assignedTo: new FormControl(''),
        assignedUser: new FormControl(''),
        createdDate: new FormControl(''),
        createdUserName: new FormControl(''),
        lastUpdatedDate: new FormControl(''),
        status: new FormControl(''),
        priority: new FormControl(''),
        description: new FormControl(''),
        workNotes: new FormControl(''),
        resolvedComment:new FormControl('')
      }
    );
  }

  updateTicket(formDataThatChanged: Ticket, closeModal = true) {
    const form = Object.assign(this.ticketFromParent, formDataThatChanged);
    this.ticket
      .updateTicket(form)
      .then((mesg: string) => {
        if (closeModal) {
          this.closeModal.emit();
        }
      })
      .catch(error => console.log(error));
  }

  onAdminComment() {
    if (this.ticketFromParent.status === 'inProgress') {
      this.ticketFromParent.status = 'pending';
      this.updateTicket(this.ticketFromParent, false);
    }
  }
}
