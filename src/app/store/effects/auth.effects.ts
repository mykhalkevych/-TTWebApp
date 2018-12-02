import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, catchError, map, take } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
} from '../actions/auth.action';
import { Observable, of } from 'rxjs';
import { HandleError } from '../actions/shared.action';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    switchMap((action: LogIn) => {
      return this.authService.login(action.payload)
        .then((user: any) => {
          return new LogInSuccess(user);
        })
        .catch((error) => {
          return of(new LogInFailure({ error: error }));
        });
    }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.
    ofType(AuthActionTypes.SIGNUP)
    .pipe(take(1), map((action: SignUp) => action.payload),
      switchMap((payload: any) => {
        return this.authService.signUp(payload)
          .then(_ => {
            return new SignUpSuccess({ emial: payload.email, password: payload.password });
          })
          .catch(error => {
            console.log(error);
            return new  HandleError({ error: error });
          });
      }),
    );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );


  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );
}
