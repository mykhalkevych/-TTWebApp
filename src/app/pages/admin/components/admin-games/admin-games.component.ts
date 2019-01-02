import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectPlayers, selectGames } from 'src/app/store/app.states';
import { Player } from 'src/app/models/player.model';
import { CreateGame, DeleteGame, LoadGames } from 'src/app/store/actions/games.actions';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.scss']
})
export class AdminGamesComponent implements OnInit {

  gameForm: FormGroup;
  tournaments = ['Championship', 'Cup'];
  players: Array<Player> = [];
  alreadySelected: Player;
  games: Array<Game> = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.store.dispatch(new LoadGames());
    this.store.select(selectPlayers)
      .subscribe(res => {
        this.players = res;
      });
    this.store.select(selectGames)
      .subscribe(res => {
        this.games = res;
      });
  }

  ngOnInit() {
    this.gameForm = this.fb.group({
      date: [new Date(), [Validators.required]],
      double: [false],
      tournament: ['', Validators.required],
      gameType: ['big', Validators.required],
      status: ['new', Validators.required],
      firstPlayer: [null, Validators.required],
      secondPlayer: [null, Validators.required]
    });
  }

  createGame() {
    if (this.gameForm.valid) {
      const gameData = { ...this.gameForm.value };
      delete gameData.firstPlayer.disabled;
      delete gameData.secondPlayer.disabled;
      gameData.id = Date.now().toString();
      gameData.date = gameData.date.toISOString();
      this.store.dispatch(new CreateGame(gameData));
    }

  }

  filterPlayers(player) {
    this.players.forEach(el => {
      if (!player) {
        el['disabled'] = false;
        return;
      }
      if (el.id === player.id) {
        el['disabled'] = true;
      }
    });
  }

  deleteGame(game) {
    this.store.dispatch(new DeleteGame(game));
  }

}
