import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Player } from 'src/app/models/player.model';
import { AppState, selectPlayers } from 'src/app/store/app.states';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.scss']
})
export class NewGameDialogComponent implements OnInit {

  newGameForm: FormGroup;
  players: Array<Player> = [];
  playersSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewGameDialogComponent>,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.playersSubscription = this.store.select(selectPlayers)
      .subscribe(res => {
        console.log(res);
        this.players = res;
      });
    this.newGameForm = this.fb.group({
      double: [true, Validators.required],
      gameType: ['small', Validators.required],
      gamesCount: [5, Validators.required],
      oponents: [[], Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  sendGameRequest() {
    if (this.newGameForm.valid) {

    }
  }

}
