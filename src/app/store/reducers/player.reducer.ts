import { Player } from '../../models/player.model';
import { PlayerActionTypes, PlayerActions } from '../actions/player.actions';

export interface State {
  players: Array<Player>;
  currentPlayer: Player;
}

export const initialState: State = {
  players: [],
  currentPlayer: <Player>{}
};


export function reducer(state = initialState, action: PlayerActions): State {
  switch (action.type) {
    case PlayerActionTypes.LOAD_PLAYERS_SUCCESS: {
      return {
        ...state,
        players: action.payload
      };
    }
    case PlayerActionTypes.LOAD_PLAYER_SUCCESS: {
      return {
        ...state,
        currentPlayer: action.payload
      };
    }
    case PlayerActionTypes.ADD_PLAYER_SUCCESS: {
      return {
        ...state,
        players: [...state.players, action.payload]
      };
    }
    case PlayerActionTypes.UPDATE_PLAYER_SUCCESS: {
      return {
        ...state,
        players: state.players.map(player => player.id === action.payload.id ? action.payload : player)
      };
    }
    case PlayerActionTypes.DELETE_PLAYER_SUCCESS: {
      return {
        ...state,
        players: state.players.filter(player => player.id !== action.payload.id)
      };
    }
    default: {
      return state;
    }
  }
}

export const getPlayers = (state: State) => state.players;
export const getCurrentPlayer = (state: State) => state.currentPlayer;


