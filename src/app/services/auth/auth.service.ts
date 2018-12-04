import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import * as fromRoot from 'src/app/store/app.states';
import { StartLoading } from './../../store/actions/shared.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<fromRoot.AppState>
  ) {
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  signUp(authData) {
    const { email, password } = authData;
    this.store.dispatch(new StartLoading());
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(authData) {
    const { email, password } = authData;
    console.log(23);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
