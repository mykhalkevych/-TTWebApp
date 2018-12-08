import { StopLoading } from './../actions/shared.action';
import { Player } from './../../models/player.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';


import { AddPlayer } from '../actions/player.actions';
import { AppState } from './../app.states';
import { AuthService } from '../../services/auth/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess,
  SignUp, SignUpSuccess,
} from '../actions/auth.action';
import { HandleError, StartLoading } from '../actions/shared.action';
import { LoginDialogComponent } from 'src/app/shared/components/dialog/login-dialog/login-dialog.component';


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
  LogIn: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN),
      switchMap((action: LogIn) => {
        this.store.dispatch(new StartLoading());
        return this.authService.login(action.payload)
          .then((user: any) => {
            return new LogInSuccess(user);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      }));

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap((user) => {
        this.store.dispatch(new StopLoading());
        localStorage.setItem('token', user.payload.token);
        this.dialog.closeAll();
        this.router.navigateByUrl('/');
      })
    );

  @Effect()
  SignUp: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap((payload: any) => {
        return this.authService.signUp(payload)
          .then(res => {
            res.user['userName'] = payload.name;
            return new SignUpSuccess(res);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      }),
    );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNUP_SUCCESS),
      tap((data) => {
        console.log(data);
        const user = data.payload.user;
        const player: Player = {
          id: user.uid,
          name: user.userName,
          email: user.email
        };
        this.store.dispatch(new AddPlayer(player));
        this.dialog.closeAll();
        this.dialog.open(LoginDialogComponent, {
          data: { email: user.email },
          width: '400px'
        });
      })
    );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap((user) => {
        localStorage.removeItem('token');
      })
    );
}
