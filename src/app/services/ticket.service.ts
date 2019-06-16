import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { LoaderService } from './loader.service';
import { of, Subject, combineLatest, Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { Ticket } from '../metadata/ticket.metadata';
import { UserProfile } from '../metadata/user.metadata';
import { UserService } from './user.service';

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
  private _admins: UserProfile[];

  constructor(private db: AngularFireDatabase,
              private user: UserService,
              private loader: LoaderService) {}

  destroy(): void {
    this.subs.unsubscribe();
    this._filterData = null;
  }

  getTickets() {
    this.loader.startLoader();

    let obv1: Observable<SnapshotAction<any>[]>;
    const uid = this.user.userProfile.uid;
    if (this.user.userProfile.role === 'employee') {
      obv1 = this.db.list('/tickets', ref => ref.orderByChild('createdUser').equalTo(uid)).snapshotChanges();
    } else {
      obv1 = this.db.list('/tickets').snapshotChanges();
    }
    const obv2 = this.db.list('/users').valueChanges();

    this.subs.add(combineLatest(obv1, obv2).subscribe(results => {
      this.loader.stopLoader();
      this._data = results[0].map(a => {
        const data = a.payload.val() as Ticket;
        data.id = a.payload.key;

        const assignedUser = results[1].find(user => {
          const userProfile = user as UserProfile;
          return userProfile.uid === data.assignedTo;
        }) as UserProfile;
        if (assignedUser) {
          data.assignedUser = assignedUser.firstName + ' ' + assignedUser.lastName;
        }

        const createdUser = results[1].find(user => {
          const userProfile = user as UserProfile;
          return userProfile.uid === data.createdUser;
        }) as UserProfile;
        if (createdUser) {
          data.createdUserName = createdUser.firstName + ' ' + createdUser.lastName;
        }

        this._admins = results[1].filter(user => {
          const userProfile = user as UserProfile;
          return userProfile.role === 'admin';
        }) as UserProfile[];
        return data;
      });
      this.filter();

    },
    error => of([]),
    ));

  }

  get tickets() {
    return this._displayData$.asObservable();
  }

  get admins() {
    return this._admins.map(admin => {
      return {
        label: admin.firstName + ' ' + admin.lastName,
        value: admin.uid
      };
    });
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

  updateTicket(ticket: Ticket) {

    // status = inprogress when admin is first assigned
    if (ticket.status === 'open' && ticket.assignedTo !== null) {
      ticket.status = 'inProgress';

    // status = pending when admin posts a comment
    } else if (ticket.status === 'inProgress' && ticket.assignedTo !== null) {
      ticket.status = 'pending';
    }

    // update last updated time
    ticket.lastUpdatedDate = this.getCurrDateTime();

    const result = this.db.list('/tickets').update(ticket.id, {
      assignedTo: ticket.assignedTo,
      lastUpdatedDate: ticket.lastUpdatedDate,
      priority: ticket.priority,
      status: ticket.status,
      workNotes: ticket.workNotes,
      resolvedComment: ticket.resolvedComment
    });

    return result.then(() => 'Successfully Updated') as Promise<string>;
  }

  getCurrDateTime() {
    const today = new Date();
    const date = today.getFullYear() + '-' +
                 this.formatTime((today.getMonth() + 1)) + '-' +
                 this.formatTime(today.getDate());
    const time = this.formatTime(today.getHours()) + ':' +
                 this.formatTime(today.getMinutes()) + ':' +
                 this.formatTime(today.getSeconds());
    return date + ' ' + time; // use for when the user saves the ticket, the updated date changes to this value
  }

  formatTime(time) {
    return ('0' + time).slice(-2);
  }

  addTicket(ticket: Ticket, userId: string) {
    ticket.createdUser = userId;
    ticket.createdDate = this.getCurrDateTime();
    ticket.status = 'open';
    const result = this.db.list(`/tickets`).push(ticket);
    return result.then(() => result.key) as Promise<string>;
  }
}
