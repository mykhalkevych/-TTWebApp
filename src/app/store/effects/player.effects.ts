import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PlayerService } from './../../services/player/player.service';
import { AddPlayer, PlayerActionTypes, AddPlayerSuccess, LoadPlayersSuccess } from '../actions/player.actions';
import { HandleError } from '../actions/shared.action';




@Injectable()
export class PlayerEffects {
  constructor(
    private actions: Actions,
    private playerService: PlayerService,
  ) { }

  @Effect()
  LoadPlayers: Observable<any> = this.actions
    .pipe(
      ofType(PlayerActionTypes.LOAD_PLAYERS),
      switchMap((_) => {
        return this.playerService.loadPlayers()
          .valueChanges()
          .toPromise()
          .then((players: any) => {
            return new LoadPlayersSuccess(players);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      }));

  @Effect()
  AddPlayer: Observable<any> = this.actions
    .pipe(
      ofType(PlayerActionTypes.ADD_PLAYER),
      switchMap((action: AddPlayer) => {
        return this.playerService.addPlayer(action.payload)
          .then((res: any) => {
            console.log(res);
            return new AddPlayerSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
}
