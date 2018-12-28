import { Action } from '@ngrx/store';
import { Player } from './../../models/player.model';


export enum PlayerActionTypes {
  LOAD_PLAYERS = '[Player] Load Players',
  LOAD_PLAYERS_SUCCESS = '[Player] Load Players Success',
  LOAD_PLAYER = '[Player] Load Player',
  LOAD_PLAYER_SUCCESS = '[Player] Load Player Success',
  ADD_PLAYER = '[Player] Add player',
  ADD_PLAYER_SUCCESS = '[Player] Add player success',
  DELETE_PLAYER = '[Player] Delete player',
  DELETE_PLAYER_SUCCESS = '[Player] Delete player success',
}

export class LoadPlayers implements Action {
  readonly type = PlayerActionTypes.LOAD_PLAYERS;
  constructor() { }
}
export class LoadPlayersSuccess implements Action {
  readonly type = PlayerActionTypes.LOAD_PLAYERS_SUCCESS;
  constructor(public payload: Array<Player>) { }
}

export class LoadPlayer implements Action {
  readonly type = PlayerActionTypes.LOAD_PLAYER;
  constructor(public payload: string) { }
}
export class LoadPlayerSuccess implements Action {
  readonly type = PlayerActionTypes.LOAD_PLAYER_SUCCESS;
  constructor(public payload: Player) { }
}

export class AddPlayer implements Action {
  readonly type = PlayerActionTypes.ADD_PLAYER;
  constructor(public payload: Player) { }
}

export class AddPlayerSuccess implements Action {
  readonly type = PlayerActionTypes.ADD_PLAYER_SUCCESS;
  constructor(public payload: Player) { }
}

export class DeletePlayer implements Action {
  readonly type = PlayerActionTypes.DELETE_PLAYER;
  constructor(public payload: Player) { }
}

export class DeletePlayerSuccess implements Action {
  readonly type = PlayerActionTypes.DELETE_PLAYER_SUCCESS;
  constructor(public payload: Player) { }
}


export type PlayerActions =
  | LoadPlayers
  | LoadPlayersSuccess
  | LoadPlayer
  | LoadPlayerSuccess
  | AddPlayer
  | DeletePlayer
  | DeletePlayerSuccess
  | AddPlayerSuccess;
