import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { SignUp, LogIn, LogOut } from 'src/app/store/actions/auth.action';
import * as auth from 'src/app/store/reducers/auth.reducer';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidenavRef;
  isUserLoggedIn = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(selectAuthState)
      .subscribe((res: auth.State) => {
        console.log(res);
        this.isUserLoggedIn = res.isAuthenticated;
      });
  }

  singUp() {
    const authUser = {
      email: 'sdgf@assd.com',
      password: '12345678'
    };
    this.store.dispatch(new SignUp(authUser));
  }

  login() {
    const authUser = {
      email: '32ds453@asd.com',
      password: '12345678'
    };
    this.store.dispatch(new LogIn(authUser));

  }

  logout() {
    this.store.dispatch(new LogOut());
  }

}
