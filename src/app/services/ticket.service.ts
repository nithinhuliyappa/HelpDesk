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
}
