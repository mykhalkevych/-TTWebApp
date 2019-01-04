import { Action } from '@ngrx/store';
import { Game } from '../../models/game.model';


export enum GamesActionTypes {
  LOAD_GAMES = '[Games] Load Games',
  LOAD_GAMES_SUCCESS = '[Games] Load Games Success',
  CREATE_GAME = '[Games] Create Game',
  CREATE_GAME_SUCCESS = '[Games] Create Game success',
  UPDATE_GAME = '[Games] Update Game',
  UPDATE_GAME_SUCCESS = '[Games] Update Game success',
  DELETE_GAME = '[Games] Delete Game',
  DELETE_GAME_SUCCESS = '[Games] Delete Game success',
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

export class UpdateGame implements Action {
  readonly type = GamesActionTypes.UPDATE_GAME;
  constructor(public payload: Game) { }
}

export class UpdateGameSuccess implements Action {
  readonly type = GamesActionTypes.UPDATE_GAME_SUCCESS;
  constructor(public payload: Game) { }
}

export class DeleteGame implements Action {
  readonly type = GamesActionTypes.DELETE_GAME;
  constructor(public payload: Game) { }
}

export class DeleteGameSuccess implements Action {
  readonly type = GamesActionTypes.DELETE_GAME_SUCCESS;
  constructor(public payload: Game) { }
}

export type GamesActions =
  | LoadGames
  | LoadGamesSuccess
  | CreateGame
  | CreateGameSuccess
  | UpdateGame
  | UpdateGameSuccess
  | DeleteGame
  | DeleteGameSuccess;

