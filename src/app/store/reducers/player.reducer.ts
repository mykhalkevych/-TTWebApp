import { Player } from '../../models/player.model';
import { PlayerActionTypes, PlayerActions } from '../actions/player.actions';

export interface State {
  players: Array<Player>;
}

export const initialState: State = {
  players: []
};


export function reducer(state = initialState, action: PlayerActions): State {
  switch (action.type) {
    case PlayerActionTypes.LOAD_PLAYERS_SUCCESS: {
      return {
        ...state,
      };
    }
    case PlayerActionTypes.ADD_PLAYER_SUCCESS: {
      return {
        ...state,
        players: [...state.players, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}

