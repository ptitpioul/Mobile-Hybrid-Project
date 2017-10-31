//import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

/*
@Injectable()
export class AuthProvider {

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

} */

import {Injectable} from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  constructor() {}

  loginUser(email: string, password: string): Promise<any> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

signupUser(email: string, password: string): Promise<any> {
  return firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then( newUser => {
    firebase
    .database()
    .ref('/userProfile')
    .child(newUser.uid)
    .set({ email: email });
  });
}

resetPassword(email: string): Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
}

logoutUser(): Promise<void> {
  return firebase.auth().signOut();
}
}
