import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserProfile } from '../metadata/user.metadata';
import { of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currUserProfile: UserProfile;

  constructor(private db: AngularFireDatabase,
              private loader: LoaderService) { }

  get userProfile(): UserProfile {
    return this.currUserProfile;
  }

  getUsers() {
    this.loader.startLoader();
    return this.db.list('/users').valueChanges().pipe(
      map(users => {
        this.loader.stopLoader();
        return users;
      }),
      catchError(error => of([]))
    );
  }

  getUserById(uid) {
    this.db.list('/users', ref => ref.orderByChild('uid').equalTo(uid))
    .valueChanges().pipe(take(1)).subscribe(items => {
      this.currUserProfile = items ? items[0] as UserProfile : null;
    },
    error => of([]));
  }

  async addUser({ email, firstName, lastName, role }: UserProfile, uid) {
    try {
      await this.db.object(`users/${uid}`).set({ uid, email, firstName, lastName, role});
      return 'user Added succesfully';
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
}
