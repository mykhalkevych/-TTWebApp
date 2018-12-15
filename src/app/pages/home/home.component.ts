import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppState, selectPlayers, selectNews } from 'src/app/store/app.states';
import { Player } from './../../models/player.model';
import { LoadPlayers } from 'src/app/store/actions/player.actions';
import { News } from 'src/app/models/news.model';
import { LoadNews } from 'src/app/store/actions/news.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  players: Array<Player> = [];
  news: Array<News> = [];

  playersSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadPlayers());
    this.store.dispatch(new LoadNews());
    this.playersSubscription = this.store.select(selectPlayers)
      .subscribe(res => {
        console.log(res);
        this.players = res;
      });
    this.store.select(selectNews)
      .subscribe(res => {
        this.news = res;
      });
  }
  ngOnDestroy() {
    this.playersSubscription.unsubscribe();
  }

}
