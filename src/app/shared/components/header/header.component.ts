import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { LogOut } from 'src/app/store/actions/auth.action';
import * as auth from 'src/app/store/reducers/auth.reducer';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from 'src/app/shared/components/dialog/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../dialog/registration-dialog/registration-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidenavRef;
  isUserLoggedIn = false;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.select(selectAuthState)
      .subscribe((res: auth.State) => {
        console.log(res);
        this.isUserLoggedIn = res.isAuthenticated;
      });
  }

  singUp() {
    this.dialog.open(RegistrationDialogComponent, {
      width: '400px'
    });
  }

  login() {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }

  logout() {
    this.store.dispatch(new LogOut());
  }

}
