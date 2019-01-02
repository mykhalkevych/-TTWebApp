import { Player } from './../../models/player.model';
import { LoadPlayer, LoadPlayerSuccess, DeletePlayer, DeletePlayerSuccess, UpdatePlayer } from 'src/app/store/actions/player.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { PlayerService } from './../../services/player/player.service';
import { AddPlayer, PlayerActionTypes, AddPlayerSuccess, LoadPlayersSuccess } from '../actions/player.actions';
import { HandleError, StartLoading, StopLoading } from '../actions/shared.action';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { DeleteNewsSuccess } from '../actions/news.actions';




@Injectable()
export class PlayerEffects {
  constructor(
    private actions: Actions,
    private playerService: PlayerService,
    private store: Store<AppState>
  ) { }

  @Effect()
  LoadPlayers: Observable<any> = this.actions
    .pipe(
      ofType(PlayerActionTypes.LOAD_PLAYERS),
      mergeMap(_ => {
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

  @Effect({ dispatch: false })
  UpdatePlayers: Observable<any> = this.actions
    .pipe(
      ofType(PlayerActionTypes.UPDATE_PLAYER),
      switchMap((action: UpdatePlayer) => {
        return this.playerService.updatePlayer(action.payload)
          .then(_ => {
            // this.store.dispatch(new StopLoading());
            // return new UpdateNewsSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
  @Effect()
  DeletePlayer: Observable<any> = this.actions
    .pipe(
      ofType(PlayerActionTypes.DELETE_PLAYER),
      switchMap((action: DeletePlayer) => {
        this.store.dispatch(new StartLoading());
        return this.playerService.deletePlayer(action.payload)
          .then(_ => {
            this.store.dispatch(new StopLoading());
            return new DeletePlayerSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
}
