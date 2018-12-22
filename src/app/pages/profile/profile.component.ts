import { User } from './../../models/user.model';
import { AppState, getCurrentUser } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: User = {};

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select(getCurrentUser)
      .subscribe((user: User) => {
        this.userInfo = user;
      });
  }

  ngOnInit() {

  }

}
