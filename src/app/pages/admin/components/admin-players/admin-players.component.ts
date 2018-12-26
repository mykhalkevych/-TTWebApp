import { Component, OnInit } from '@angular/core';
import { AppState, selectPlayers } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Player } from 'src/app/models/player.model';
import { LoadPlayers } from 'src/app/store/actions/player.actions';

@Component({
  selector: 'app-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['./admin-players.component.scss']
})
export class AdminPlayersComponent implements OnInit {

  players: Array<Player> = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadPlayers());
    this.store.select(selectPlayers)
      .subscribe(res => {
        console.log(res);
        this.players = res;
      });
  }

  deletePlayer(player) {

  }

}
