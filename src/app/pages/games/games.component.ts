import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectGames } from 'src/app/store/app.states';
import { Game } from 'src/app/models/game.model';
import { LoadGames } from 'src/app/store/actions/games.actions';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  games: Array<Game> = [];

  constructor(
    private store: Store<AppState>
  ) {
    this.store.dispatch(new LoadGames());
  }

  ngOnInit() {
    this.store.select(selectGames)
      .subscribe(res => {
        console.log(res);
        this.games = res;
      });
  }

}
