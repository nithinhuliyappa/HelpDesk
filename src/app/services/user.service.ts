import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserProfile } from '../metadata/user.metadata';
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currUserProfile: UserProfile;
  private subs = new SubSink();

  constructor(private db: AngularFireDatabase,
              private loader: LoaderService) { }

  get userProfile(): UserProfile {
    return this.currUserProfile;
  }

  getUsers() {
    this.loader.startLoader();
    return this.db.list('/users').snapshotChanges().pipe(
      map(users => {
        this.loader.stopLoader();
        return users.map(a => {
          const data = a.payload.val() as UserProfile;
          data.id = a.payload.key;
          return data;
        });
      }),
      catchError(error => of([]))
    );
  }

  getUserById(uid) {
    this.db.list('/users', ref => ref.orderByChild('uid').equalTo(uid))
    .snapshotChanges().pipe(take(1)).subscribe(items => {
      this.currUserProfile = items.map(a => {
        const data = a.payload.val() as UserProfile;
        data.id = a.payload.key;
        return data;
      })[0];
    },
    error => of([]));
  }
}
