import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(authData) {
    const { email, password } = authData;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    return this.afAuth;
  }

}
