import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
      this.userData = angularFireAuth.authState;
  }

/* Sign up */
SignUp(email: string, password: string) {
  this.angularFireAuth
  .auth
  .createUserWithEmailAndPassword(email, password)
  .then(res => {
    window.alert('You are Successfully signed up!'+ res);
  })
  .catch(error => {
  window.alert('Something is wrong:'+ error.message);
  });
  }
   
  /* Sign in */
  SignIn(email: string, password: string) {
  this.angularFireAuth
  .auth
  .signInWithEmailAndPassword(email, password)
  .then(res => {
 window.alert('You are successfully logged in');
  })
  .catch(err => {
    window.alert('Something is wrong:'+ err.message);
  });
  }
   
  /* Sign out */
  SignOut() {
  this.angularFireAuth
  .auth
  .signOut();
  }

  getConsoleMessage() {
    console.log("chiamato");
    return( this.consoleMessage);
  }

  setConsoleMessage(mex) {
    this.consoleMessage = mex;
    return;
  }
   

     
    



}
