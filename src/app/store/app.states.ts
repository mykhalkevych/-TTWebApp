import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducer';
import * as shared from './reducers/shared.reducer';

export interface AppState {
    authState: auth.State;
    sharedState: shared.State;
}

export const reducers = {
    shared: shared.reducer,
    auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<auth.State>('auth');
