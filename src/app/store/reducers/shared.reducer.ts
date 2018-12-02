import { User } from 'src/app/models/user.model';
import { SharedTypes, AllShared } from '../actions/shared.action';

export interface State {
  errorMessage: string | null;
}

export const initialState: State = {
  errorMessage: null
};

export function reducer(state = initialState, action: AllShared): State {
  switch (action.type) {
    case SharedTypes.ERROR: {
      console.log(2323);
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    default: {
      return state;
    }
  }
}
