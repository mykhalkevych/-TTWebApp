import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { selectPlayers, AppState } from 'src/app/store/app.states';
import { LoadPlayers } from 'src/app/store/actions/player.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

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
