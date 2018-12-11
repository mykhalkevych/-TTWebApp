import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppState, selectPlayers } from 'src/app/store/app.states';
import { Player } from './../../models/player.model';
import { LoadPlayers } from 'src/app/store/actions/player.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  players: Array<Player> = [];
  playersSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadPlayers());
    this.playersSubscription = this.store.select(selectPlayers)
      .subscribe(res => {
        console.log(res);
        this.players = res;
      });
  }
  ngOnDestroy() {
    this.playersSubscription.unsubscribe();
  }

}
