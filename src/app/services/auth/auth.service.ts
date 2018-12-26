import { UpdateAuthState } from './../../store/actions/auth.action';
import { AppState } from './../../store/app.states';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LogOut } from 'src/app/store/actions/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private authUser: firebase.User;
  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {
    this.user = afAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.authUser = user;
          this.store.dispatch(new UpdateAuthState(user));
        } else {
          this.store.dispatch(new LogOut());
        }
      }
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getCurrentUser() {
    return this.afAuth.user;
  }

  signUp(user) {
    const { email, password } = user;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(user) {
    const { email, password } = user;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  updateUser(userData) {
    return this.authUser.updateProfile(userData);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
