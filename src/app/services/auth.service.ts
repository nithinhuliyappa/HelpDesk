import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { LoaderService } from './loader.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { User as NewUser } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private authDb: AngularFireAuth,
    private loader: LoaderService,
    private db: AngularFireDatabase
  ) {}

  register(user, callback) {
    this.loader.startLoader();
    return new Promise<any>((resolve, reject) => {
      this.authDb.auth.createUserWithEmailAndPassword(user.email, user.password).then(async res => {
          const { uid } = res.user;
          const response = this.addUserToDb(user, uid);
          callback();
          this.loader.stopLoader();
          resolve(response);
        })
        .catch(err => reject(err));
    });
  }

  async addUserToDb({ email, firstName, lastName, role, password }: NewUser, uid) {
    try {
      await this.db.object(`users/${uid}`).set({ uid, email, firstName, lastName, role ,password});
      return 'user Added succesfully';
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  getCurrentUser(): User {
    return this.authDb.auth.currentUser;
  }

  login(email, password, callback) {
    this.loader.startLoader();
    return new Promise<any>((resolve, reject) => {
      this.authDb.auth.signInWithEmailAndPassword(email, password).then(
        res => {
          callback();
          this.loader.stopLoader();
          resolve(res);
        },
        err => reject(err)
      );
    });
  }

  signOut(): void {
    this.authDb.auth.signOut();
  }
}
