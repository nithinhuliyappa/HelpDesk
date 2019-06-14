import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  today = new Date();
  date = this.today.getFullYear() + '-' + (this.today.getMonth() + 1) + '-' + this.today.getDate();
  time = this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds();
  dateTime = this.date + ' ' + this.time; // use for when the user saves the ticket, the updated date changes to this value

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

  private buildForm() {
    this.editTicketForm = this.fb.group(
      {
        assignedTo: ['', [ Validators.required]],
        assignedUser: ['', [Validators.required]],
        createdDate: ['', [Validators.required]],
        createdUserName: ['', [Validators.required]],
        lastUpdatedDate: ['', [Validators.required]],
        status: ['', [Validators.required]],
        priority: ['', [Validators.required]],
        summary: ['', [Validators.required]],
        comments: ['', [Validators.required]],
        workNotes: ['', [Validators.required]],
        resolvedComment: ['', [Validators.required]]
      }
    );
  }

  updateTicket(formDataThatChanged) {
    this.ticket.updateTicket(formDataThatChanged);
    // use this function to save any changed data to the database
    this.closeModal.emit();
  }

}
