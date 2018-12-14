import { Action } from '@ngrx/store';
import { Game } from '../../models/game.model';


export enum GamesActionTypes {
  LOAD_GAMES = '[Games] Load Games',
  LOAD_GAMES_SUCCESS = '[Games] Load Games Success',
  CREATE_GAME = '[News] Add News',
  CREATE_GAME_SUCCESS = '[News] Add News success'
}

export class LoadGames implements Action {
  readonly type = GamesActionTypes.LOAD_GAMES;
  constructor() { }
}
export class LoadGamesSuccess implements Action {
  readonly type = GamesActionTypes.LOAD_GAMES_SUCCESS;
  constructor(public payload: Array<Game>) { }
}

export class CreateGame implements Action {
  readonly type = GamesActionTypes.CREATE_GAME;
  constructor(public payload: Game) { }
}

export class CreateGameSuccess implements Action {
  readonly type = GamesActionTypes.CREATE_GAME_SUCCESS;
  constructor(public payload: Game) { }
}


export type GamesActions =
  | LoadGames
  | LoadGamesSuccess
  | CreateGame
  | CreateGameSuccess;
