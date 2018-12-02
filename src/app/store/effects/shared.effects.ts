import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, switchMap, catchError, map } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';
import { SharedTypes, HandleError } from '../actions/shared.action';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
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

        //  this.snackBar.open('Error', 'Ok', {
        //    duration: 2500
        //  });

        // remap to noop Action if no state needs to be updated.
        // or for example on 401 Errors dispach a re-login action etc.

        return of({ type: 'noop' });
      })
    );
}
