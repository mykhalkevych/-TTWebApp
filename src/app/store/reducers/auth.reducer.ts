import { AuthService } from './../../services/auth/auth.service';
import { User } from 'src/app/models/user.model';
import { AuthActionTypes, All } from '../actions/auth.action';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User;
}

export const initialState: State = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: {
    photoURL: ''
  }
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          id: action.payload.uid,
          email: action.payload.email,
          ...action.payload
        }
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.UPDATE_AUTH_STATE: {
      return {
        ...state,
        user: { ...action.payload }
      };
    }
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    }
    default: {
      return state;
    }
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getCurrentUser = (state: State) => state.user;
