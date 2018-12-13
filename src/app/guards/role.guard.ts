import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router
  ) {

  }

  canActivate() {
    // return this.authService.isLoggedIn()
    //   .pipe(map(value => {
    //     if (value) {
    //       return true;
    //     } else {
    //       this.router.navigate(['']);
    //       return false;
    //     }
    //   }));
    return true;
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
