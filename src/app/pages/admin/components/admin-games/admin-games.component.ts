import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectPlayers, selectGames } from 'src/app/store/app.states';
import { Player } from 'src/app/models/player.model';
import { CreateGame, DeleteGame, LoadGames, UpdateGame } from 'src/app/store/actions/games.actions';
import { Game, GameSet } from 'src/app/models/game.model';

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
  isEditing = false;
  sets: Array<GameSet> = [];
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
    for (let i = 0; i < 5; i++) {
      this.sets.push({
        firstPlayerPoints: 0,
        secondPlayerPoints: 0
      });
    }
  }

  ngOnInit() {
    this.gameForm = this.fb.group({
      date: [new Date(), [Validators.required]],
      double: [false],
      tournament: ['', Validators.required],
      gameType: ['big', Validators.required],
      status: ['new', Validators.required],
      firstPlayer: [null, Validators.required],
      secondPlayer: [null, Validators.required],
      firstPlayerScore: [0, Validators.required],
      secondPlayerScore: [0, Validators.required],
      sets: [this.sets, Validators.required]
    });
  }

  saveGame() {
    if (this.gameForm.valid) {
      const gameData = { ...this.gameForm.value };
      delete gameData.firstPlayer.disabled;
      delete gameData.secondPlayer.disabled;
      if (this.isEditing) {
        this.store.dispatch(new UpdateGame(gameData));
      } else {
        gameData.id = Date.now().toString();
        gameData.date = gameData.date.toISOString();
        this.store.dispatch(new CreateGame(gameData));
      }
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

  private setGameFormData(gameData) {
    this.gameForm.controls['date'].setValue(gameData.date);
    this.gameForm.controls['double'].setValue(gameData.double);
    this.gameForm.controls['tournament'].setValue(gameData.tournament);
    this.gameForm.controls['gameType'].setValue(gameData.gameType);
    this.gameForm.controls['firstPlayer'].setValue(this.players.find(el => el.id === gameData.firstPlayer.id));
    this.gameForm.controls['secondPlayer'].setValue(this.players.find(el => el.id === gameData.secondPlayer.id));
  }


  editGame(game) {
    this.isEditing = true;
    this.setGameFormData(game);
    console.log(game);
  }

  deleteGame(game) {
    this.store.dispatch(new DeleteGame(game));
  }

  resetForm() {
    this.isEditing = false;
  }

}
