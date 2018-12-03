import { User } from 'src/app/models/user.model';
import { SharedTypes, AllShared } from '../actions/shared.action';

export interface State {
  errorMessage: string | null;
  isLoading: boolean;

}

export const initialState: State = {
  errorMessage: null,
  isLoading: false
};


export function reducer(state = initialState, action: AllShared): State {
  switch (action.type) {
    case SharedTypes.ERROR: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
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
        isLoading: true
      };
    default: {
      return state;
    }
  }
}
