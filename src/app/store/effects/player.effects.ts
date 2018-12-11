import { Player } from './../../models/player.model';
import { LoadPlayers, LoadPlayer, LoadPlayerSuccess } from 'src/app/store/actions/player.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
      mergeMap((action: LoadPlayers) => {
        return this.playerService.loadPlayers()
          .pipe(
            map((players: Array<Player>) => new LoadPlayersSuccess(players)),
            catchError(error => of(new HandleError({ error: error })))
          );
      }));
  @Effect()
  LoadPlayer: Observable<any> = this.actions
    .pipe(
      ofType(PlayerActionTypes.LOAD_PLAYER),
      switchMap((action: LoadPlayer) => {
        return this.playerService.loadPlayer(action.payload)
          .pipe(
            map((player: Player) => new LoadPlayerSuccess(player)),
            catchError(error => of(new HandleError({ error: error })))
          );
      }));

  @Effect({ dispatch: false })
  AddPlayer: Observable<any> = this.actions
    .pipe(
      ofType(PlayerActionTypes.ADD_PLAYER),
      switchMap((action: AddPlayer) => {
        return this.playerService.addPlayer(action.payload)
          .then((res: any) => {
            return new AddPlayerSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
}
