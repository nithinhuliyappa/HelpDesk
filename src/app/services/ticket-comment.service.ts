import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { combineLatest, Subject } from 'rxjs';
import { TicketComment } from '../metadata/ticket.metadata';
import { UserProfile } from '../metadata/user.metadata';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class TicketCommentService {

  private subs = new SubSink();
  private _displayData$ = new Subject<TicketComment[]>();

  constructor(private db: AngularFireDatabase) {}

  destroy(): void {
    this.subs.unsubscribe();
  }

  get comments() {
    return this._displayData$;
  }

  getTicketComments(ticketId) {

    const obv1 = this.db.list(`/tickets/${ticketId}/comments`).valueChanges();
    const obv2 = this.db.list('/users').valueChanges();

    this.subs.add(combineLatest(obv1, obv2).subscribe(results => {
      this._displayData$.next(results[0].map((comment: TicketComment) => {
          const u = results[1].find(user => {
            const userProfile = user as UserProfile;
            return userProfile.uid === comment.uid;
          }) as UserProfile;

          if (u) {
            comment.name = u.firstName + ' ' + u.lastName;
          }
          return comment;
        }))
    }));
  }

  addComment(ticketId, userId: string, comment: string) {

    const result = this.db.list(`/tickets/${ticketId}/comments`).push({
      message: comment,
      uid: userId
    });
    return result.then(() => result.key) as Promise<string>;
  }
}
