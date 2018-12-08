import { Action } from '@ngrx/store';
import { Player } from './../../models/player.model';


export enum PlayerActionTypes {
  LOAD_PLAYERS = '[Player] Load Players',
  LOAD_PLAYERS_SUCCESS= '[Player] Load Players Success',
  ADD_PLAYER = '[Player] Add player',
  ADD_PLAYER_SUCCESS = '[Player] Add player success'
}

export class LoadPlayers implements Action {
  readonly type = PlayerActionTypes.LOAD_PLAYERS;
  constructor() { }
}
export class LoadPlayersSuccess implements Action {
  readonly type = PlayerActionTypes.LOAD_PLAYERS_SUCCESS;
  constructor(public payload: Array<Player>) { }
}

export class AddPlayer implements Action {
  readonly type = PlayerActionTypes.ADD_PLAYER;
  constructor(public payload: Player) { }
}

export class AddPlayerSuccess implements Action {
  readonly type = PlayerActionTypes.ADD_PLAYER_SUCCESS;
  constructor(public payload: Player) { }
}


export type PlayerActions =
  | LoadPlayers
  | LoadPlayersSuccess
  | AddPlayer
  | AddPlayerSuccess;
