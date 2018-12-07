import { Action } from '@ngrx/store';


export enum PlayerActionTypes {
  ADD_PLAYER = '[Player] Add player',
  GET_ALL_PLAYERS = '[Player] Get Players',
}

export class AddPlayer implements Action {
  readonly type = PlayerActionTypes.ADD_PLAYER;
  constructor(public payload: any) { }
}

export class GetAllPlayers implements Action {
  readonly type = PlayerActionTypes.GET_ALL_PLAYERS;
  constructor(public payload: any) { }
}

export type All =
  | AddPlayer
  | GetAllPlayers;
