import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { LoaderService } from './loader.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authDb: AngularFireAuth,
              private loader: LoaderService,
              private user: UserService) { }

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
    this.loader.startLoader();
    return new Promise<any>((resolve, reject) => {
      this.authDb.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        setTimeout(() => {
          callback();
          this.loader.stopLoader();
          resolve(res);
        }, 500);
        this.user.getUserById(res.user.uid);
      }, err => reject(err));
    });
  }

  signOut(): void {
    this.authDb.auth.signOut();
  }

}
