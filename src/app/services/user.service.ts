import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authDb: AngularFireAuth) { }

  register(user){
    return new Promise<any>((resolve, reject) => {
      this.authDb.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  getCurrentUser(): User {
    return this.authDb.auth.currentUser;
  }

  login(email, password, callback) {
    return new Promise<any>((resolve, reject) => {
      this.authDb.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        callback();
        resolve(res);
      }, err => reject(err));
    });
  }

  signOut(): void {
    this.authDb.auth.signOut();
  }

}
