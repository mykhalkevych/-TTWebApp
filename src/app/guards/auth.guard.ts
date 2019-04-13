import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs/operators';
import { AppState, getIsAuthenticated } from '../store/app.states';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

  }

  canActivate() {
    return this.store.select(getIsAuthenticated)
      .pipe(map(value => {
        if (value) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }));
  }
}
