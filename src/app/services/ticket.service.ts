import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoaderService } from './loader.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Ticket {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private db: AngularFireDatabase,
              private loader: LoaderService) { }

  getTickets() {
    this.loader.startLoader();
    return this.db.list('/tickets').snapshotChanges().pipe(
      map(items => {
        this.loader.stopLoader();
        return items.map(a => {
          const data = a.payload.val() as Ticket;
          data.id = a.payload.key;
          return data;
        });
      }),
      catchError(error => of([]))
    );
  }

  // EX usage: this.ticket.updateTicketStatus(ticketItem, 'open');
  // where ticket is a TicketService object, and ticketItem as an item from the database
  // tested with <button (click)="updateStatus(dataItem)">Update Status</button> // on ticket-list html
  updateTicketStatus(ticket, status: string) {
    let statusToDatabase = '';
    // console.log(this.tickets);
    switch (status) {
      case 'open': // when the ticket is first open
        statusToDatabase = 'Open';
        break;
      case 'inProgress': // when the ticket is first assigned and when user posts a comment
        statusToDatabase = 'In Progress';
        break;
      case 'pending': // when an admin comments, pending user response
        statusToDatabase = 'Pending User Response';
        break;
      case 'resolved': // when a user or admin resolves the ticket
        statusToDatabase = 'Resolved';
        break;
      case 'new': // not sure where this will be used yet
        statusToDatabase = 'New';
        break;
      default: // wrong value passed
        console.log('status was not changed');
        break;
    }
    if (statusToDatabase !== '') {
      this.db.list('/tickets').update(ticket.id, { status: statusToDatabase });
    } else {
      console.log('Second parameter invalid to updateTicketStatus');
    }
  }
}
