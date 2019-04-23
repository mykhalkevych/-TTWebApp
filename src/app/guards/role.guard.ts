import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectCurrentPlayer } from '../store/app.states';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {

  }
  canActivate() {
    return this.store.select(selectCurrentPlayer)
      .pipe(map(value => {
        if (value.role === 'admin') {
          return true;
        } else {
          this.snackBar.open('У вас немає відповідних прав', 'Ok', {
            duration: 8000
          });
          this.router.navigate(['']);
          return false;
        }
      }));
  }

  resolve(): void {
    //   this.authService.isLoggedIn()
    //     .subscribe(value => {
    //       if (value) {
    //         this.router.navigate(['/evaluation-platform/main']);
    //       }
    //     });
  }
}
