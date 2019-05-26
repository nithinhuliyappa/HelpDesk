import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoaderService } from './loader.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private db: AngularFireDatabase,
              private loader: LoaderService) { }

  getTickets() {
    this.loader.startLoader();
    return this.db.list('/tickets').valueChanges().pipe(
      map(data => {
        this.loader.stopLoader();
        return data;
      }),
      catchError(error => of([]))
    );
  }
}
