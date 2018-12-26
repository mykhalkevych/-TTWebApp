import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getIsAuthenticated, getCurrentUser } from 'src/app/store/app.states';
import { LogOut } from 'src/app/store/actions/auth.action';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from 'src/app/shared/components/dialog/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../dialog/registration-dialog/registration-dialog.component';
import { NewGameDialogComponent } from '../dialog/new-game-dialog/new-game-dialog.component';
import { SettingDialogComponent } from '../dialog/setting-dialog/setting-dialog.component';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidenavRef;
  isUserLoggedIn = false;
  user: User;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.select(getIsAuthenticated)
      .subscribe(res => {
        console.log(res);
        this.isUserLoggedIn = res;
      });
    this.store.select(getCurrentUser)
      .subscribe(res => {
        console.log(res);
        this.user = res;
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

  openNewGameDialog() {
    this.dialog.open(NewGameDialogComponent, {
      width: '400px'
    });
  }

  openSettigs() {
    this.dialog.open(SettingDialogComponent, {
      width: '400px'
    });
  }

}
