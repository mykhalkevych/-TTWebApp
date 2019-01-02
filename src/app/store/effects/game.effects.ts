
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { HandleError, StartLoading, StopLoading } from '../actions/shared.action';
import { AppState } from '../app.states';
import { GamesService } from 'src/app/services/games/games.service';
import { GamesActionTypes, LoadGamesSuccess, CreateGame, CreateGameSuccess, DeleteGame, DeleteGameSuccess } from '../actions/games.actions';
import { Game } from 'src/app/models/game.model';




@Injectable()
export class GameEffects {
  constructor(
    private actions: Actions,
    private gameService: GamesService,
    private store: Store<AppState>
  ) { }

  @Effect()
  LoadGames: Observable<any> = this.actions
    .pipe(
      ofType(GamesActionTypes.LOAD_GAMES),
      mergeMap(_ => {
        return this.gameService.loadGames()
          .pipe(
            map((games: Array<Game>) => new LoadGamesSuccess(games)),
            catchError(error => of(new HandleError({ error: error })))
          );
      }));

  @Effect({dispatch: false})
  CreateGame: Observable<any> = this.actions
    .pipe(
      ofType(GamesActionTypes.CREATE_GAME),
      switchMap((action: CreateGame) => {
        return this.gameService.createGame(action.payload)
          .then((res: any) => {
            return new CreateGameSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );

  @Effect()
  DeleteGame: Observable<any> = this.actions
    .pipe(
      ofType(GamesActionTypes.DELETE_GAME),
      switchMap((action: DeleteGame) => {
        this.store.dispatch(new StartLoading());
        return this.gameService.deleteGame(action.payload)
          .then(_ => {
            this.store.dispatch(new StopLoading());
            return new DeleteGameSuccess(action.payload);
          })
          .catch(error => {
            return new HandleError({ error: error });
          });
      })
    );
}
