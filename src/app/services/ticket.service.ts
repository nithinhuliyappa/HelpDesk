import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoaderService } from './loader.service';
import { of, Subject } from 'rxjs';
import { SubSink } from 'subsink';
import { Ticket } from '../metadata/ticket.metadata';

function search(data){
  return Object.keys(this).every((key) => data[key] === this[key]);
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private _filterData: Ticket;
  private _data: Ticket[];
  private _displayData$ = new Subject<Ticket[]>();
  private subs = new SubSink();

  constructor(private db: AngularFireDatabase,
              private loader: LoaderService) {}

  destroy(): void {
    this.subs.unsubscribe();
    this._filterData = null;
  }

  getTickets() {
    this.loader.startLoader();
    this.subs.add(this.db.list('/tickets', ref => ref.orderByChild('createdUser').equalTo('5ce97a235cc3a076005128a0'))
    .snapshotChanges().subscribe(items => {
      this.loader.stopLoader();
      this._data = items.map(a => {
        const data = a.payload.val() as Ticket;
        data.id = a.payload.key;
        return data;
      });
      this.filter();
    },
    error => of([])));
  }

  get tickets() {
    return this._displayData$.asObservable();
  }

  filter() {
    let list = Object.assign([], this._data);
    if (this._filterData) {
      list = list.filter(search, this._filterData);
    }
    this._displayData$.next(list);
  }

  applyFilter(data: Ticket) {
    if (data) {
      Object.keys(data).forEach((key) => (data[key] === '') && delete data[key]);
    }
    this._filterData = data;
    this.filter();
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
