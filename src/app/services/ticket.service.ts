import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private db: AngularFireDatabase) { }

  getTickets() {
    return this.db.list('/tickets').valueChanges();
  }
}
