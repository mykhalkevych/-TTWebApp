import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, selectPlayers } from 'src/app/store/app.states';
import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.scss']
})
export class AdminGamesComponent implements OnInit {

  gameForm: FormGroup;
  tournaments = ['1', '2'];
  players: Array<Player> = [];
  filteredPlayers: Array<Player> = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.store.select(selectPlayers)
      .subscribe(res => {
        this.filteredPlayers = this.players = res;
      });
  }

  ngOnInit() {
    this.gameForm = this.fb.group({
      date: [new Date(), [Validators.required]],
      double: [false],
      tournament: ['', Validators.required],
      gameType: ['', Validators.required],
      status: ['new', Validators.required],
      firstPlayer: [null, Validators.required],
      secondPlayer: [null, Validators.required]
    });
  }

  createGame() {
    console.log(this.gameForm.value);

  }

  filterPlayers(player) {
    this.filteredPlayers = this.players.filter(el => el.id !== player.id);
  }

}
