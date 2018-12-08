import { User } from 'src/app/models/user.model';
import { AuthActionTypes, All } from '../actions/auth.action';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
}

export const initialState: State = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        }
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    default: {
      return state;
    }
  }
}
