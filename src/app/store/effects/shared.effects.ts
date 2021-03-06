import { AppState } from './../app.states';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';
import { SharedTypes, HandleError, StopLoading } from '../actions/shared.action';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';


@Injectable()
export class SharedEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) { }

  // The Error handler
  @Effect({ dispatch: false })
  HandleError = this.actions
    .pipe(
      ofType(SharedTypes.ERROR),
      switchMap((error: HandleError) => {
        console.log(error);
        // ... you can check the payload here to show different messages
        // like if error.statusCode === 501 etc.
        this.store.dispatch(new StopLoading());

        const errMsg = error.payload.error.message;
        this.snackBar.open(errMsg, 'Ok', {
          duration: 8000
        });

        // remap to noop Action if no state needs to be updated.
        // or for example on 401 Errors dispach a re-login action etc.

        return of({ type: 'noop' });
      })
    );
}
