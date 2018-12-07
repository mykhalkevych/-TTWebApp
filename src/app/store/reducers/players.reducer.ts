import { Player } from './../../models/player.model';
import { SharedTypes, AllShared } from '../actions/shared.action';

export interface State {
  players: Array<Player>;
  isLoading: boolean;

}

export const initialState: State = {
  players: [],
  isLoading: false
};


export function reducer(state = initialState, action: AllShared): State {
  switch (action.type) {
    case SharedTypes.ERROR: {
      return {
        ...state
      };
    }
    case SharedTypes.START_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case SharedTypes.STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    default: {
      return state;
    }
  }
}

export const getIsloading = (state: State) => state.isLoading;
