import { Player } from './../../models/player.model';
import { AppState, selectPlayers } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { LoadPlayers } from 'src/app/store/actions/player.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  players: Array<Player> = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadPlayers());
    this.store.select(selectPlayers)
      .subscribe(res => {
        console.log(res);
        this.players = res;
      });
  }

}
