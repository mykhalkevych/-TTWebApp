import { Game } from '../../models/game.model';
import { GamesActionTypes, GamesActions } from '../actions/games.actions';

export interface State {
  games: Array<Game>;
}

export const initialState: State = {
  games: [],
};


export function reducer(state = initialState, action: GamesActions): State {
  switch (action.type) {
    case GamesActionTypes.LOAD_GAMES_SUCCESS: {
      return {
        ...state,
        games: action.payload
      };
    }
    case GamesActionTypes.CREATE_GAME_SUCCESS: {
      return {
        ...state,
        games: [...state.games, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}

export const getGames = (state: State) => state.games;


