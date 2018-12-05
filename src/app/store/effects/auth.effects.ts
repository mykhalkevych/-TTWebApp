import { StopLoading } from './../actions/shared.action';
import { AppState } from './../app.states';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, map } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess,
  SignUp, SignUpSuccess,
} from '../actions/auth.action';
import { Observable, of } from 'rxjs';
import { HandleError } from '../actions/shared.action';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';


@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap((action: LogIn) => {
      return this.authService.login(action.payload)
        .then((user: any) => {
          return new LogInSuccess(user);
        })
        .catch(error => {
          return new HandleError({ error: error });
        });
    }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.dialog.closeAll();
      this.router.navigateByUrl('/');
    })
  );

  @Effect()
  SignUp: Observable<any> = this.actions.
    ofType(AuthActionTypes.SIGNUP)
    .pipe(map((action: SignUp) => action.payload),
      switchMap((payload: any) => {
        console.log(payload);
        return this.authService.signUp(payload)
          .then(_ => {
            return new SignUpSuccess({ emial: payload.email, password: payload.password });
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      }),
    );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      this.dialog.closeAll();
      this.store.dispatch(new StopLoading());
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );
}
